import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { redirectIfAuthGuard } from '../guards/redirect-if-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    canActivate: [redirectIfAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
