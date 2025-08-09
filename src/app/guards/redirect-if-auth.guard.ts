import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FireauthService } from '../services/fireauth.service';

export const redirectIfAuthGuard: CanActivateFn = async (route, state) => {
  const auth = inject(FireauthService)
  const router = inject(Router);

  await auth.waitForAuth()

  if(auth.checkAuth() != null){
    return true
  }

  router.navigate(['/auth-screen'])
  return false
};
