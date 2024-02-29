import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe, NgClass, NgIf } from '@angular/common';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  passwordType = 'password';
  eyeIcon = 'visibility';
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  eyeToggle(e: any): void {
    e.preventDefault();
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';

    this.eyeIcon =
      this.eyeIcon == 'visibility' ? 'visibility_off' : 'visibility';
  }

  onSubmit(): void {
    console.log(this.loginForm);
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
}
