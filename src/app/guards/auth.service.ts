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
                this.router.navigate(['/desc']);
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
            this.setToken(res.access_token);
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
    if (this.getToken() === undefined) {
      return false;
    } else {
      return true;
    }
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
