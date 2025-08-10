import { CanActivateFn, Router } from '@angular/router';
import { FireauthService } from '../services/fireauth.service';
import { inject } from '@angular/core';
import { Platform } from '@ionic/angular';

export const redirectIfGuestGuard: CanActivateFn = async (route, state) => {
  const auth = inject(FireauthService)
  const router = inject(Router);
  const platform = inject(Platform);

  await auth.waitForAuth()

  // const user = platform.is('android') || platform.is('ios') || platform.is('mobile') ? (await auth.mobileCheckAuth()).user : auth.checkAuth()
  const result = await auth.mobileCheckAuth();

  if(result.user == null){
    return true
  }

  router.navigate(['/'])
  return false;
};
