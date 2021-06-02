import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionsDataRoutingModule } from './regions-data-routing.module';
import {RegionsDataComponent} from './regions-data.component';
import {MaterialModule} from '../../modules/material.module';
import {FormsModule} from '@angular/forms';
import {DateFilterModule} from '../../elements/date-filter/date-filter.module';


@NgModule({
  declarations: [
    RegionsDataComponent
  ],
    imports: [
        RegionsDataRoutingModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        DateFilterModule,
    ]
})
export class RegionsDataModule { }
