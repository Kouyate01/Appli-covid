import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualityPage } from './actuality.page';

const routes: Routes = [
  {
    path: '',
    component: ActualityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualityPageRoutingModule {}
