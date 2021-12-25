import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Plotly} from 'angular-plotly.js/lib/plotly.interface';

export interface FullScreenChartData {
    graphData: Plotly.Data;
    config: any;
}

@Component({
    selector: 'app-full-screen-chart',
    templateUrl: './full-screen-chart.component.html',
    styleUrls: ['./full-screen-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FullScreenChartComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FullScreenChartData,
        private dialogRef: MatDialogRef<FullScreenChartComponent>,
    ) {}

    public closeFullScreen(): void {
        this.dialogRef.close();
    }
}
