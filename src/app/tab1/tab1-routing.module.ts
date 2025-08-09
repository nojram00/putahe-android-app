import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { redirectIfAuthGuard } from '../guards/redirect-if-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    canActivate: [redirectIfAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
