import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FireauthService } from '../services/fireauth.service';
import { Platform } from '@ionic/angular';

export const redirectIfAuthGuard: CanActivateFn = async (route, state) => {
  const auth = inject(FireauthService)
  const router = inject(Router);
  const platform = inject(Platform);

  // await auth.waitForAuth()

  // const user = platform.is('android') || platform.is('ios') || platform.is('mobile') ? (await auth.mobileCheckAuth()).user : auth.checkAuth()

  const result = await auth.mobileCheckAuth();

  if(result.user != null){
    return true
  }

  router.navigate(['/auth-screen'])
  return false
};
