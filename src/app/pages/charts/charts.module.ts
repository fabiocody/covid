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
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {FullScreenChartComponent} from './full-screen-chart/full-screen-chart.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ChartHelperModule} from '../../services/chart-helper/chart-helper.module';

@NgModule({
    declarations: [ChartsComponent, FullScreenChartComponent],
    imports: [
        ChartsRoutingModule,
        CommonModule,
        FormsModule,
        PlotlyViaCDNModule,
        DynamicScriptLoaderModule,
        DateFilterModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        ChartHelperModule,
    ],
})
export class ChartsModule {}
