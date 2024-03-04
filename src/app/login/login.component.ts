import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { ValidateLogin } from './res.error';
import { environment } from '../enviranment';
import { AuthService } from '../guards/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    NgClass,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  resError?: ValidateLogin | null;
  passwordType = 'password';
  eyeIcon = 'visibility';
  isLoad: boolean = false;
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  eyeToggle(e: any): void {
    e.preventDefault();
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';

    this.eyeIcon =
      this.eyeIcon == 'visibility' ? 'visibility_off' : 'visibility';
  }

  async onSubmit(): Promise<void> {
    this.resError = null;
    this.isLoad = true;
    await this.authService
      .signIn(this.loginForm.value)
      .then((value) => value)
      .catch((err) => {
        this.resError = err;
        return null;
      });
    setTimeout(() => {
      this.isLoad = !this.isLoad;
    }, 2000);
  }
  validateForm(field: string): ValidateLogin {
    let errors: string | null = null;
    if (this.loginForm.get(field) && this.loginForm.get(field)?.errors) {
      errors = Object.keys(this.loginForm.get(field)!.errors!)[0];
      // console.log(errors);
    }

    if (
      errors &&
      this.loginForm.get(field)?.errors?.[errors] &&
      (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty)
    ) {
      // this.resError = null;
      if (errors === 'required') {
        return new ValidateLogin(
          true,
          400,
          field === 'email' ? 'กรุณากรอกอีเมล!' : 'กรุณากรอกรหัสผ่าน!'
        );
      } else {
        return new ValidateLogin(true, 400, 'รูปแบบอีเมลไม่ถูกต้อง!!');
      }
    } else if (
      this.resError &&
      this.resError.status === 401 &&
      (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty)
    ) {
      return new ValidateLogin(
        true,
        this.resError.status,
        this.resError.message
      );
    }
    return new ValidateLogin(false);
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
}
