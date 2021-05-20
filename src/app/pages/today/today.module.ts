import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodayRoutingModule} from './today-routing.module';
import {TodayComponent} from './today.component';
import {TodayCardComponent} from './today-card/today-card.component';
import {MaterialModule} from '../../modules/material.module';
import {MomentModule} from 'ngx-moment';


@NgModule({
  declarations: [
    TodayComponent,
    TodayCardComponent,
  ],
  imports: [
    TodayRoutingModule,
    CommonModule,
    MaterialModule,
    MomentModule,
  ]
})
export class TodayModule {
}
