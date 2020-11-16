import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwipeCardLibModule } from 'ng-swipe-card';
import { IonicModule } from '@ionic/angular';

import { ActualityPageRoutingModule } from './actuality-routing.module';

import { ActualityPage } from './actuality.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwipeCardLibModule,
    IonicModule,
    ActualityPageRoutingModule
  ],
  declarations: [ActualityPage]
})
export class ActualityPageModule {}
