import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {ChartHelperService} from '../../services/chart-helper/chart-helper.service';
import {PlotlyData} from '../../services/chart-helper/plotly-data';
import {
    DynamicScriptLoaderService,
    LoadableScripts,
} from '../../services/dynamic-script-loader/dynamic-script-loader.service';
import {DeltaService} from '../../services/delta/delta.service';
import {SubSink} from 'subsink';
import {DataModel} from '../../model/DataModel';
import {DateService} from '../../services/date/date.service';
import {debounceTime} from 'rxjs/operators';
import {AnalysisService} from './analysis.service';

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit, OnDestroy {
    public readonly METRICS = {
        totalCases: 'Casi totali',
        activeCases: 'Casi attivi',
        recovered: 'Guariti',
        deaths: 'Morti',
        hospitalized: 'Ricoverati',
        icu: 'Terapia intensiva',
    };
    private readonly sampleCount = 30;
    private readonly dateRange: Date[];
    public graphData!: PlotlyData;
    private data: DataModel[] = [];
    private subs = new SubSink();
    public metric = 'totalCases';
    public shortMa = 50;
    public longMa = 200;

    constructor(
        private dataService: DataService,
        private chartHelperService: ChartHelperService,
        private scriptLoader: DynamicScriptLoaderService,
        private analysisService: AnalysisService,
    ) {
        const endDate = DateService.addDays(DateService.withTimeAtStartOfDay(new Date()), 1);
        const startDate = DateService.addDays(endDate, -this.sampleCount);
        this.dateRange = [startDate, endDate];
    }

    public ngOnInit(): void {
        this.scriptLoader.load(LoadableScripts.plotlyItLocale);
        this.subs.sink = this.dataService.data.pipe(debounceTime(50)).subscribe(data => {
            this.data = DeltaService.createDelta(data);
            this.plot();
        });
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
        this.scriptLoader.unload(LoadableScripts.plotlyItLocale);
    }

    public get config(): any {
        return this.chartHelperService.CONFIG;
    }

    public get metricKeys(): string[] {
        return Object.keys(this.METRICS);
    }

    private plot(): void {
        const y = this.data.map(d => d[this.metric]);
        const yReversed = [...y].reverse();
        const shortMa = this.analysisService.sma(yReversed, this.shortMa).reverse();
        const longMa = this.analysisService.sma(yReversed, this.longMa).reverse();
        const data = this.data.map((d, i) => {
            return {
                x: d.date,
                y: d[this.metric],
                shortMa: shortMa[i],
                longMa: longMa[i],
            };
        });
        this.graphData = {
            data: [
                {
                    x: data.map(d => d.x),
                    y: data.map(d => d.y),
                    name: this.METRICS[this.metric],
                    line: {shape: 'spline'},
                    type: 'bar',
                },
                {
                    x: data.map(d => d.x),
                    y: data.map(d => d.shortMa),
                    name: `MA(${this.shortMa})`,
                    line: {shape: 'spline'},
                },
                {
                    x: data.map(d => d.x),
                    y: data.map(d => d.longMa),
                    name: `MA(${this.longMa})`,
                    line: {shape: 'spline'},
                },
            ],
            layout: {
                title: '',
                xaxis: {range: this.dateRange},
                yaxis: {
                    range: this.chartHelperService.getYRange(data, ['y', 'shortMa', 'longMa'], this.sampleCount),
                },
                dragmode: 'pan',
            },
        };
    }

    public onMetricChange(value: string): void {
        this.metric = value;
        this.plot();
    }

    public onShortMaChange(value: number): void {
        this.shortMa = value;
        this.plot();
    }

    public onLongMaChange(value: number): void {
        this.longMa = value;
        this.plot();
    }
}
