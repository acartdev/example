import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Profile } from './profile.dto';

export const logginGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogin()) {
    return true;
  } else {
    console.log('take');

    const profile: Profile | null = await authService
      .checkProfile()
      .then((value) => value)
      .catch((error) => {
        return null;
      });
    if (!profile) return true;
    if (profile?.sub.role === 'admin') {
      return router.createUrlTree(['/admin']);
    } else {
      return router.createUrlTree(['/desc']);
    }
  }
};
