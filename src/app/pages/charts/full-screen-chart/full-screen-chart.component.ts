import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChartHelperService} from '../../../services/chart-helper/chart-helper.service';
import {PlotlyData} from '../../../services/chart-helper/plotly-data';

@Component({
    selector: 'app-full-screen-chart',
    templateUrl: './full-screen-chart.component.html',
    styleUrls: ['./full-screen-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FullScreenChartComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PlotlyData,
        private dialogRef: MatDialogRef<FullScreenChartComponent>,
        private chartHelperService: ChartHelperService,
    ) {}

    public closeFullScreen(): void {
        this.dialogRef.close();
    }

    public get config(): any {
        return this.chartHelperService.CONFIG;
    }
}
