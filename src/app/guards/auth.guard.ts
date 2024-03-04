import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['requiredRole'];
  const checkProfile = await authService.checkProfile();
  const checkRole = await authService.hasRole(requiredRole);
  if (authService.isLogin()) {
    return router.navigate(['/login']);
  }
  return Promise.all([checkProfile, checkRole, authService.isLogin()])
    .then(([profile, hasRole, loggin]) => {
      if (profile && hasRole && loggin && profile?.sub.isActive === false) {
        return true;
      } else if (profile?.sub.isActive) {
        return router.createUrlTree(['/exist']);
      } else if (route.url[0].path === 'detail' && !hasRole) {
        return router.createUrlTree(['/desc']);
      }
      return router.createUrlTree(['/login']);
    })
    .catch((error) => {
      return router.createUrlTree(['/login']);
    });
};
