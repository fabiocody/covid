import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataModel} from '../../model/DataModel';
import {DataService} from '../../services/data/data.service';
import {Plotly} from 'angular-plotly.js/lib/plotly.interface';
import * as moment from 'moment';
import {SubSink} from 'subsink';
import {DeltaService} from '../../services/delta/delta.service';
import {
    DynamicScriptLoaderService,
    LoadableScripts,
} from '../../services/dynamic-script-loader/dynamic-script-loader.service';

class GraphData {
    data: Plotly.Data;
    delta: Plotly.Data;
    hospitalized: Plotly.Data;
    deltaHospitalized: Plotly.Data;
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
    private filteredData: DataModel[] = [];
    private filteredDeltaData: DataModel[] = [];
    public toDate = moment().toDate();
    public fromDate = moment(this.toDate).subtract(14, 'days').toDate();
    public graphData: GraphData = new GraphData();
    public config = {locale: 'it-IT'};
    private subs = new SubSink();

    constructor(private dataService: DataService, private scriptLoader: DynamicScriptLoaderService) {}

    ngOnInit(): void {
        this.scriptLoader.load(LoadableScripts.plotlyItLocale);
        this.subs.sink = this.dataService.data.subscribe(data => {
            this.data = data;
            this.toDate = this.data.length > 0 ? this.data[0].date : moment().toDate();
            this.fromDate = moment(this.toDate).subtract(14, 'days').toDate();
            this.createDeltaData().then(_ => this.filterDataset());
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
        this.scriptLoader.unload(LoadableScripts.plotlyItLocale);
    }

    async createDeltaData(): Promise<void> {
        this.deltaData = DeltaService.createDelta(this.data);
    }

    async filterDataset(): Promise<void> {
        this.filteredData = this.data
            .filter(d => moment(d.date).isSameOrAfter(this.fromDate, 'day'))
            .filter(d => moment(d.date).isSameOrBefore(this.toDate, 'day'));
        this.filteredDeltaData = this.deltaData
            .filter(d => moment(d.date).isSameOrAfter(this.fromDate, 'day'))
            .filter(d => moment(d.date).isSameOrBefore(this.toDate, 'day'));
        this.plot().then();
    }

    async plot(): Promise<void> {
        const graphData = new GraphData();
        if (this.filteredData.length > 0) {
            const x = this.filteredData.map(d => d.date);
            graphData.data = {
                data: [
                    {
                        x,
                        y: this.filteredData.map(d => d.totalCases),
                        name: 'Casi totali',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.filteredData.map(d => d.activeCases),
                        name: 'Casi attivi',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.filteredData.map(d => d.recovered),
                        name: 'Guariti',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.filteredData.map(d => d.deaths),
                        name: 'Morti',
                        line: {shape: 'spline'},
                    },
                ],
                layout: {title: 'Dati'},
            };
            graphData.delta = {
                data: [
                    {
                        x,
                        y: this.filteredDeltaData.map(d => d.totalCases),
                        name: 'Casi totali',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.filteredDeltaData.map(d => d.activeCases),
                        name: 'Casi attivi',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.filteredDeltaData.map(d => d.recovered),
                        name: 'Guariti',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.filteredDeltaData.map(d => d.deaths),
                        name: 'Morti',
                        line: {shape: 'spline'},
                    },
                ],
                layout: {title: 'Variazioni'},
            };
            graphData.hospitalized = {
                data: [
                    {
                        x,
                        y: this.filteredData.map(d => d.hospitalized),
                        name: 'Ricoverati',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.filteredData.map(d => d.icu),
                        name: 'TI',
                        line: {shape: 'spline'},
                    },
                ],
                layout: {title: 'Ospedalizzati'},
            };
            graphData.deltaHospitalized = {
                data: [
                    {
                        x,
                        y: this.filteredDeltaData.map(d => d.hospitalized),
                        name: 'Ricoverati',
                        line: {shape: 'spline'},
                    },
                    {
                        x,
                        y: this.filteredDeltaData.map(d => d.icu),
                        name: 'TI',
                        line: {shape: 'spline'},
                    },
                ],
                layout: {title: 'Variazioni ospedalizzati'},
            };
            graphData.positivePercentage = {
                data: [
                    {
                        x,
                        y: this.filteredData.map(d => d.positiveTestsRatio),
                        showLegend: false,
                        line: {shape: 'spline'},
                    },
                ],
                layout: {title: 'Percentuale di positivi', yaxis: {title: '%'}},
            };
        }
        this.graphData = graphData;
    }
}
