import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableRoutingModule } from './data-table-routing.module';
import {DataTableComponent} from './data-table.component';
import {MaterialModule} from '../../modules/material.module';
import {MomentModule} from 'ngx-moment';
import {FormsModule} from '@angular/forms';


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
  ]
})
export class DataTableModule { }
