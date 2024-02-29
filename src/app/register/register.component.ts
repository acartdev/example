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
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.regisForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
    });
  }
  onSubmit(): void {}

  passwordType = 'password';
  eyeIcon = 'visibility';
  eyeToggle(e: any) {
    e.preventDefault();
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';

    this.eyeIcon =
      this.eyeIcon == 'visibility' ? 'visibility_off' : 'visibility';
  }
}
