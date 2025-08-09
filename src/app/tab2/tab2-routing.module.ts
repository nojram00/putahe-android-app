import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { redirectIfAuthGuard } from '../guards/redirect-if-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
    canActivate: [redirectIfAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
