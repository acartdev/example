import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DescComponent } from './desc/desc.component';
import { UnittestComponent } from './unittest/unittest.component';
import { LessonOneComponent } from './lesson-one/lesson-one.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { logginGuard } from './guards/loggin.guard';
import { ExistComponent } from './exist/exist.component';
import { existGuard } from './guards/exist.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [logginGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [logginGuard],
  },
  {
    path: 'exist',
    component: ExistComponent,
    canActivate: [existGuard],
    data: { requiredRole: 'user' },
  },

  {
    path: 'desc',
    component: DescComponent,
    canActivate: [authGuard],
    data: { requiredRole: 'user' },
  },
  {
    path: 'unit',
    canActivate: [authGuard],
    data: { requiredRole: 'user' },
    component: UnittestComponent,
    children: [{ path: '', component: LessonOneComponent }],
  },
  {
    path: 'detail/:email',
    component: UnittestComponent,
    canActivate: [authGuard],
    data: { requiredRole: 'admin' },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { requiredRole: 'admin' },
  },
];
