import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DataTableRoutingModule} from './data-table-routing.module';
import {DataTableComponent} from './data-table.component';
import {MaterialModule} from '../../modules/material.module';
import {MomentModule} from 'ngx-moment';
import {FormsModule} from '@angular/forms';
import {DateFilterModule} from '../../elements/date-filter/date-filter.module';


@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    DataTableRoutingModule,
    CommonModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    DateFilterModule,
  ]
})
export class DataTableModule {
}
