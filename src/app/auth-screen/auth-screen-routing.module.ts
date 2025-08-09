import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthScreenPage } from './auth-screen.page';
import { redirectIfGuestGuard } from '../guards/redirect-if-guest.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthScreenPage,
    canActivate: [redirectIfGuestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthScreenPageRoutingModule {}
