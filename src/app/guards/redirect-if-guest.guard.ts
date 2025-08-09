import { CanActivateFn, Router } from '@angular/router';
import { FireauthService } from '../services/fireauth.service';
import { inject } from '@angular/core';

export const redirectIfGuestGuard: CanActivateFn = async (route, state) => {
  const auth = inject(FireauthService)
  const router = inject(Router);

  await auth.waitForAuth()

  if(auth.checkAuth() == null){
    return true
  }

  router.navigate(['/'])
  return false;
};
