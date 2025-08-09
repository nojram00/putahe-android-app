import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPage } from './info.page';
import { redirectIfAuthGuard } from 'src/app/guards/redirect-if-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InfoPage,
    canActivate: [redirectIfAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPageRoutingModule {}
