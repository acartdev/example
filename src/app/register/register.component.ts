import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../guards/auth.service';
import { ValidateLogin } from '../login/res.error';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    MatIconModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  regisForm!: FormGroup;
  resError?: ValidateLogin | null;
  isLoad: boolean = false;
  showToast: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.regisForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
    });
  }
  async onSubmit(): Promise<void> {
    this.resError = null;
    this.isLoad = true;
    const res = await this.authService
      .sigUp(this.regisForm.value)
      .then((value) => value)
      .catch((error) => {
        this.resError = error;
      });
    this.isLoad = false;
    if (res && !this.isLoad) {
      this.regisForm.reset();
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  }

  passwordType = 'password';
  eyeIcon = 'visibility';
  eyeToggle(e: any) {
    e.preventDefault();
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';

    this.eyeIcon =
      this.eyeIcon == 'visibility' ? 'visibility_off' : 'visibility';
  }
}
