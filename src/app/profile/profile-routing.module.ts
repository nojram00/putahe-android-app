import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { redirectIfAuthGuard } from '../guards/redirect-if-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    canActivate: [redirectIfAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
