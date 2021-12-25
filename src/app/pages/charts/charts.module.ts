import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsRoutingModule} from './charts-routing.module';
import {PlotlyViaCDNModule} from 'angular-plotly.js';
import {ChartsComponent} from './charts.component';
import {FormsModule} from '@angular/forms';
import {DateFilterModule} from '../../elements/date-filter/date-filter.module';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {DynamicScriptLoaderModule} from '../../services/dynamic-script-loader/dynamic-script-loader.module';

PlotlyViaCDNModule.setPlotlyVersion('2.0.0');
PlotlyViaCDNModule.setPlotlyBundle('basic');

@NgModule({
    declarations: [ChartsComponent],
    imports: [
        ChartsRoutingModule,
        CommonModule,
        FormsModule,
        PlotlyViaCDNModule,
        DynamicScriptLoaderModule,
        DateFilterModule,
        MatCardModule,
        MatExpansionModule,
    ],
})
export class ChartsModule {}
