import { Component } from '@angular/core';
import { NavigationError, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DescComponent } from './desc/desc.component';
import { UnittestComponent } from './unittest/unittest.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './guards/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [
    RouterOutlet,
    LoginComponent,
    DescComponent,
    UnittestComponent,
    RegisterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}
  title = 'example';
  ngOnInit(): void {
    this.router.events.subscribe(async (events) => {
      if (events instanceof NavigationError) {
        const islogin = this.authService.isLogin();
        console.log(islogin);
        const token = this.authService.getToken();
        if (token) {
          const profile = await this.authService
            .getProfile(token)
            .then((value) => value)
            .catch((e) => null);
          if (profile?.sub.role === 'user' && profile.sub.isActive !== true) {
            this.router.navigate(['/desc']);
          } else if (
            profile?.sub.role === 'user' &&
            profile.sub.isActive === true
          ) {
            this.router.navigate(['/exist']);
          } else if (profile?.sub.role === 'admin') {
            this.router.navigate(['/admin']);
          }
        }
      }
    });
  }
}
