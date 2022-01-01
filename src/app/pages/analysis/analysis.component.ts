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

interface Metric {
    name: string;
    translation: string;
}

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit, OnDestroy {
    public readonly METRICS: Metric[] = [
        {name: 'totalCases', translation: 'Casi totali'},
        {name: 'activeCases', translation: 'Casi attivi'},
        {name: 'recovered', translation: 'Guariti'},
        {name: 'deaths', translation: 'Morti'},
        {name: 'hospitalized', translation: 'Ricoverati'},
        {name: 'icu', translation: 'Terapia intensiva'},
    ];
    public selected = 0;
    public graphData!: PlotlyData;
    private data: DataModel[] = [];
    private subs = new SubSink();
    private readonly sampleCount = 30;
    private readonly dateRange: Date[];

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

    public get selectedMetric(): Metric {
        return this.METRICS[this.selected];
    }

    private plot(): void {
        const y = this.data.map(d => d[this.selectedMetric.name]);
        const ma50 = this.analysisService.sma(y.reverse(), 50).reverse();
        const ma200 = this.analysisService.sma(y.reverse(), 200).reverse();
        console.log(y);
        console.log(ma50);
        const data = this.data.map((d, i) => {
            return {
                x: d.date,
                y: d[this.selectedMetric.name],
                ma50: ma50[i],
                ma200: ma200[i],
            };
        });
        this.graphData = {
            data: [
                {
                    x: data.map(d => d.x),
                    y: data.map(d => d.y),
                    name: this.selectedMetric.translation,
                    line: {shape: 'spline'},
                    type: 'bar',
                },
                {
                    x: data.map(d => d.x),
                    y: data.map(d => d.ma50),
                    name: 'MA(50)',
                    line: {shape: 'spline'},
                },
                {
                    x: data.map(d => d.x),
                    y: data.map(d => d.ma200),
                    name: 'MA(200)',
                    line: {shape: 'spline'},
                },
            ],
            layout: {
                title: '',
                xaxis: {range: this.dateRange},
                yaxis: {
                    range: this.chartHelperService.getYRange(data, ['y', 'ma50', 'ma200'], this.sampleCount),
                },
                dragmode: 'pan',
            },
        };
    }

    public changeTab(index: number): void {
        this.selected = index;
        console.log(this.selected);
        this.plot();
    }
}
