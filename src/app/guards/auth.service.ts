import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from './profile.dto';
import { environment } from '../enviranment';
import { ValidateLogin } from '../login/res.error';
import { SignIn, SignUp } from './dto/singIn.dto';
import { Router } from '@angular/router';
import { LessonType } from '../code-editor/lessType';
import { LessonDetail } from './dto/lessonDetail.dto';
import { Avgs } from './dto/avg.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  async signIn(signIn: SignIn): Promise<string | ValidateLogin> {
    return new Promise((resolve, reject) => {
      return this.http
        .post(`${environment.baseUrl}/auth/signIn`, signIn)
        .subscribe({
          next: async (res: any) => {
            this.setToken(res.access_token);
            resolve(res.access_token);
            await this.getProfile(res.access_token).then((value) => {
              if (value?.sub.role === 'admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/']);
              }
            });
          },
          error: (err: HttpErrorResponse) => {
            reject(
              new ValidateLogin(
                true,
                err.status,
                err.error.message,
                err.error.password
              )
            );
          },
        });
    });
  }
  async updateStatus(email: string): Promise<boolean | null> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return new Promise((resolve, reject) => {
      return this.http
        .patch<boolean>(`${environment.baseUrl}/users/${email}`, {
          headers: headers,
        })
        .subscribe({
          next: (value: boolean) => resolve(value),
          error: (error: HttpErrorResponse) => reject(error),
        });
    });
  }
  async getLessonDetail(email: string): Promise<LessonType[]> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return new Promise((resolve, reject) => {
      return this.http
        .get<LessonType[]>(`${environment.baseUrl}/lesson/${email}`, {
          headers: headers,
        })
        .subscribe({
          next: (value) => {
            resolve(value);
          },
          error: (error: HttpErrorResponse) => reject(error.message),
        });
    });
  }
  async sendLesson(lesson: LessonType[]): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return new Promise((resolve, reject) => {
      return this.http
        .post(`${environment.baseUrl}/lesson`, lesson, {
          headers: headers,
        })
        .subscribe({
          next: (value) => resolve(value),
          error: (error: HttpErrorResponse) => reject(error),
        });
    });
  }
  async countLesson(email: string): Promise<number | undefined> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return new Promise((resolve, reject) => {
      return this.http
        .get<number | any>(`${environment.baseUrl}/lesson/count/${email}`, {
          headers: headers,
        })
        .subscribe({
          next: (value) => {
            resolve(value);
          },
          error: (error: HttpErrorResponse) => reject(error.message),
        });
    });
  }
  async findeDetail(): Promise<LessonDetail[] | null> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return new Promise((resolve, reject) => {
      return this.http
        .get<LessonDetail[] | null>(`${environment.baseUrl}/lesson`, {
          headers: headers,
        })
        .subscribe({
          next: (value) => {
            resolve(value);
          },
          error: (error: HttpErrorResponse) => reject(error.message),
        });
    });
  }
  async getAvg(): Promise<Avgs | undefined> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return new Promise((resolve, reject) => {
      return this.http
        .get<Avgs>(`${environment.baseUrl}/lesson/avg`, {
          headers: headers,
        })
        .subscribe({
          next: (value) => {
            resolve(value);
          },
          error: (error: HttpErrorResponse) => reject(error.message),
        });
    });
  }

  checkOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  async sigUp(signUp: SignUp): Promise<string | ValidateLogin> {
    return new Promise((resolve, reject) => {
      return this.http
        .post(`${environment.baseUrl}/users/signUp`, signUp)
        .subscribe({
          next: (res: any) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            reject(
              new ValidateLogin(
                true,
                err.status,
                err.error.message,
                err.error.password
              )
            );
          },
        });
    });
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return null;
  }
  isLogin(): boolean {
    return !!this.getToken();
  }
  async getProfile(token: string): Promise<Profile | null> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return new Promise((resolve, reject) => {
      this.http
        .get<Profile>(`${environment.baseUrl}/auth/profile`, {
          headers: headers,
        })
        .pipe()
        .subscribe({
          next: (res: Profile) => resolve(res),
          error: (err: HttpErrorResponse) => reject(err.error),
        });
    });
  }
  async hasRole(role: string): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;
    const profile = await this.getProfile(token)
      .then((value) => value)
      .catch((error) => {
        return null;
      });

    return profile?.sub.role === role;
  }
  async checkProfile(): Promise<Profile | null> {
    const token = this.getToken();
    if (!token) return null;
    return await this.getProfile(token)
      .then((value) => value)
      .catch((error) => null);
  }
}
