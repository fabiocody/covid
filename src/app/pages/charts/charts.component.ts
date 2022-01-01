import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataModel} from '../../model/DataModel';
import {DataService} from '../../services/data/data.service';
import {SubSink} from 'subsink';
import {DeltaService} from '../../services/delta/delta.service';
import {
    DynamicScriptLoaderService,
    LoadableScripts,
} from '../../services/dynamic-script-loader/dynamic-script-loader.service';
import {DateService} from '../../services/date/date.service';
import {MatDialog} from '@angular/material/dialog';
import {FullScreenChartComponent} from './full-screen-chart/full-screen-chart.component';
import {ChartHelperService} from '../../services/chart-helper/chart-helper.service';
import {PlotlyData} from '../../services/chart-helper/plotly-data';

class GraphData {
    public data!: PlotlyData;
    public delta!: PlotlyData;
    public hospitalized!: PlotlyData;
    public deltaHospitalized!: PlotlyData;
    public tests!: PlotlyData;
    public positivePercentage!: PlotlyData;
}

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
    private data: DataModel[] = [];
    private deltaData: DataModel[] = [];
    private readonly dateRange: Date[];
    private readonly sampleCount = 14;
    public graphData: GraphData = new GraphData();
    private subs = new SubSink();

    constructor(
        private dataService: DataService,
        private scriptLoader: DynamicScriptLoaderService,
        private dialog: MatDialog,
        private chartHelperService: ChartHelperService,
    ) {
        const endDate = DateService.addDays(DateService.withTimeAtStartOfDay(new Date()), 1);
        const startDate = DateService.addDays(endDate, -this.sampleCount);
        this.dateRange = [startDate, endDate];
    }

    public ngOnInit(): void {
        this.scriptLoader.load(LoadableScripts.plotlyItLocale);
        this.subs.sink = this.dataService.data.subscribe(data => {
            this.data = data;
            this.deltaData = DeltaService.createDelta(data);
            this.plot();
        });
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
        this.scriptLoader.unload(LoadableScripts.plotlyItLocale);
    }

    public get graphs(): string[] {
        return Object.keys(this.graphData).filter(k => this.graphData[k]);
    }

    public get config(): any {
        return this.chartHelperService.CONFIG;
    }

    private plot(): void {
        const graphData = new GraphData();
        if (this.data.length > 0) {
            const x = this.data.map(d => d.date);
            graphData.data = {
                data: [
                    {
                        x,
                        y: this.data.map(d => d.totalCases),
                        name: 'Casi totali',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.data.map(d => d.activeCases),
                        name: 'Casi attivi',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.data.map(d => d.recovered),
                        name: 'Guariti',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.data.map(d => d.deaths),
                        name: 'Morti',
                        line: {shape: 'spline'},
                    },
                ],
                layout: {
                    title: 'Dati',
                    xaxis: {range: this.dateRange},
                    yaxis: {
                        range: this.chartHelperService.getYRange(
                            this.data,
                            ['totalCases', 'activeCases', 'recovered', 'deaths'],
                            this.sampleCount,
                        ),
                    },
                },
            };
            graphData.delta = {
                data: [
                    {
                        x,
                        y: this.deltaData.map(d => d.totalCases),
                        name: 'Casi totali',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.deltaData.map(d => d.activeCases),
                        name: 'Casi attivi',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.deltaData.map(d => d.recovered),
                        name: 'Guariti',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.deltaData.map(d => d.deaths),
                        name: 'Morti',
                        line: {shape: 'spline'},
                    },
                ],
                layout: {
                    title: 'Variazioni',
                    xaxis: {range: this.dateRange},
                    yaxis: {
                        range: this.chartHelperService.getYRange(
                            this.deltaData,
                            ['totalCases', 'activeCases', 'recovered', 'deaths'],
                            this.sampleCount,
                        ),
                    },
                },
            };
            graphData.hospitalized = {
                data: [
                    {
                        x,
                        y: this.data.map(d => d.hospitalized),
                        name: 'Ricoverati',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.data.map(d => d.icu),
                        name: 'TI',
                        line: {shape: 'spline'},
                    },
                ],
                layout: {
                    title: 'Ospedalizzati',
                    xaxis: {range: this.dateRange},
                    yaxis: {
                        range: this.chartHelperService.getYRange(this.data, ['hospitalized', 'icu'], this.sampleCount),
                    },
                },
            };
            graphData.deltaHospitalized = {
                data: [
                    {
                        x,
                        y: this.deltaData.map(d => d.hospitalized),
                        name: 'Ricoverati',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.deltaData.map(d => d.icu),
                        name: 'TI',
                        line: {shape: 'spline'},
                    },
                ],
                layout: {
                    title: 'Variazioni ospedalizzati',
                    xaxis: {range: this.dateRange},
                    yaxis: {
                        range: this.chartHelperService.getYRange(
                            this.deltaData,
                            ['hospitalized', 'icu'],
                            this.sampleCount,
                        ),
                    },
                },
            };
            graphData.positivePercentage = {
                data: [
                    {
                        x,
                        y: this.data.map(d => d.positiveTestsRatio),
                        showLegend: false,
                        line: {shape: 'spline'},
                    },
                ],
                layout: {
                    title: 'Percentuale di positivi',
                    xaxis: {range: this.dateRange},
                    yaxis: {
                        title: '%',
                        range: this.chartHelperService.getYRange(this.data, ['positiveTestsRatio'], this.sampleCount),
                    },
                },
            };
            graphData.tests = {
                data: [
                    {
                        x,
                        y: this.deltaData.map(d => d.tests),
                        name: 'Tamponi',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.deltaData.map(d => d.molecularTests),
                        name: 'Tamponi molecolari',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.deltaData.map(d => d.antigenTests),
                        name: 'Tamponi antigenici',
                        line: {shape: 'spline'},
                    },
                ],
                layout: {
                    title: 'Tamponi',
                    xaxis: {range: this.dateRange},
                    yaxis: {
                        range: this.chartHelperService.getYRange(
                            this.deltaData,
                            ['tests', 'molecularTests', 'antigenTests'],
                            this.sampleCount,
                        ),
                    },
                },
            };
        }
        this.graphData = graphData;
    }

    public openFullScreen(graphKey: string): void {
        this.dialog.open(FullScreenChartComponent, {
            data: this.graphData[graphKey],
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '100%',
            width: '100%',
            autoFocus: false,
            restoreFocus: false,
        });
    }
}
