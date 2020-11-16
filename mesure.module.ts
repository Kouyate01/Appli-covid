import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesurePageRoutingModule } from './mesure-routing.module';

import { MesurePage } from './mesure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesurePageRoutingModule
  ],
  declarations: [MesurePage]
})
export class MesurePageModule {}
