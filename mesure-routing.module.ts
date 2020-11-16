import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesurePage } from './mesure.page';

const routes: Routes = [
  {
    path: '',
    component: MesurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesurePageRoutingModule {}
