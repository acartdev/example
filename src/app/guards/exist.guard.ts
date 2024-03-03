import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const existGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['requiredRole'];
  const checkProfile = await authService.checkProfile();
  const checkRole = await authService.hasRole(requiredRole);
  return Promise.all([checkProfile, checkRole, authService.isLogin()])
    .then(([profile, hasRole, loggin]) => {
      if (loggin && hasRole && profile?.sub.role) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
    .catch((error) => {
      return router.createUrlTree(['/']);
    });
};
