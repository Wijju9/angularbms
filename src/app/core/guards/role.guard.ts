import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/auth.model';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = (route.data['roles'] as UserRole[]) ?? [];
  const role = auth.user()?.role;
  if (!role || !allowedRoles.includes(role)) {
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;
};
