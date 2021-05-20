import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartsRoutingModule} from './charts-routing.module';
import {MaterialModule} from '../../modules/material.module';
import {PlotlyViaCDNModule} from 'angular-plotly.js';
import {ChartsComponent} from './charts.component';
import {FormsModule} from '@angular/forms';

PlotlyViaCDNModule.setPlotlyVersion('1.58.4');
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
  ]
})
export class ChartsModule {
}
