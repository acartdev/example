import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DescComponent } from './desc/desc.component';
import { UnittestComponent } from './unittest/unittest.component';
import { LessonOneComponent } from './lesson-one/lesson-one.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'desc', component: DescComponent },
  {
    path: 'unit',
    component: UnittestComponent,
    children: [{ path: '', component: LessonOneComponent }],
  },
];
