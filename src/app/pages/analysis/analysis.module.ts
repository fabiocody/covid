import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnalysisRoutingModule} from './analysis-routing.module';
import {AnalysisComponent} from './analysis.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {PlotlyViaCDNModule} from 'angular-plotly.js';
import {ChartHelperModule} from '../../services/chart-helper/chart-helper.module';
import {DynamicScriptLoaderModule} from '../../services/dynamic-script-loader/dynamic-script-loader.module';
import {AnalysisService} from './analysis.service';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [AnalysisComponent],
    imports: [
        CommonModule,
        AnalysisRoutingModule,
        MatCardModule,
        MatTabsModule,
        PlotlyViaCDNModule,
        ChartHelperModule,
        DynamicScriptLoaderModule,
        MatSelectModule,
        MatSliderModule,
        MatInputModule,
        FormsModule,
    ],
    providers: [AnalysisService],
})
export class AnalysisModule {}
