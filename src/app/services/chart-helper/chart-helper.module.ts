import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlotlyViaCDNModule} from 'angular-plotly.js';

PlotlyViaCDNModule.setPlotlyVersion('2.8.3');
PlotlyViaCDNModule.setPlotlyBundle('basic');

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class ChartHelperModule {}
