import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateFilterComponent} from './date-filter.component';
import {MaterialModule} from '../../modules/material.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DateFilterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    DateFilterComponent,
  ]
})
export class DateFilterModule {
}
