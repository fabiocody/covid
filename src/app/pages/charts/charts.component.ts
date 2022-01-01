import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataModel} from '../../model/DataModel';
import {DataService} from '../../services/data/data.service';
import {Plotly} from 'angular-plotly.js/lib/plotly.interface';
import {SubSink} from 'subsink';
import {DeltaService} from '../../services/delta/delta.service';
import {
    DynamicScriptLoaderService,
    LoadableScripts,
} from '../../services/dynamic-script-loader/dynamic-script-loader.service';
import {DateService} from '../../services/date/date.service';
import {MatDialog} from '@angular/material/dialog';
import {FullScreenChartComponent, FullScreenChartData} from './full-screen-chart/full-screen-chart.component';

class GraphData {
    data: Plotly.Data;
    delta: Plotly.Data;
    hospitalized: Plotly.Data;
    deltaHospitalized: Plotly.Data;
    tests: Plotly.Data;
    positivePercentage: Plotly.Data;
}

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
    private data: DataModel[] = [];
    private deltaData: DataModel[] = [];
    public readonly endDate = new Date();
    public readonly startDate = DateService.addDays(this.endDate, -14);
    public graphData: GraphData = new GraphData();
    public config = {locale: 'it-IT'};
    private subs = new SubSink();

    constructor(
        private dataService: DataService,
        private scriptLoader: DynamicScriptLoaderService,
        private dialog: MatDialog,
    ) {}

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
                layout: {title: 'Dati', xaxis: {range: [this.startDate, this.endDate]}},
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
                layout: {title: 'Variazioni', xaxis: {range: [this.startDate, this.endDate]}},
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
                layout: {title: 'Ospedalizzati', xaxis: {range: [this.startDate, this.endDate]}},
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
                layout: {title: 'Variazioni ospedalizzati', xaxis: {range: [this.startDate, this.endDate]}},
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
                    xaxis: {range: [this.startDate, this.endDate]},
                    yaxis: {title: '%'},
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
                layout: {title: 'Tamponi', xaxis: {range: [this.startDate, this.endDate]}},
            };
        }
        this.graphData = graphData;
    }

    public openFullScreen(graphKey: string): void {
        const data: FullScreenChartData = {
            graphData: this.graphData[graphKey],
            config: this.config,
        };
        this.dialog.open(FullScreenChartComponent, {
            data: data,
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '100%',
            width: '100%',
            autoFocus: false,
            restoreFocus: false,
        });
    }
}
