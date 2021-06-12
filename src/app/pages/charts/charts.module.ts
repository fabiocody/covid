import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartsRoutingModule} from './charts-routing.module';
import {MaterialModule} from '../../modules/material.module';
import {PlotlyViaCDNModule} from 'angular-plotly.js';
import {ChartsComponent} from './charts.component';
import {FormsModule} from '@angular/forms';
import {DateFilterModule} from '../../elements/date-filter/date-filter.module';

PlotlyViaCDNModule.setPlotlyVersion('2.0.0');
PlotlyViaCDNModule.setPlotlyBundle('basic');

@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    ChartsRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    PlotlyViaCDNModule,
    DateFilterModule,
  ]
})
export class ChartsModule {
}
