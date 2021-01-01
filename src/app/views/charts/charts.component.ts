import {Component, OnInit} from '@angular/core';
import {DataModel} from '../../model/DataModel';
import {DataService} from '../../services/data/data.service';
import * as moment from 'moment';
import {Plotly} from 'angular-plotly.js/lib/plotly.interface';

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
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public fromDate = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
  public toDate = new Date(Date.now());
  private data: DataModel[] = [];
  private deltaData: DataModel[] = [];
  private filteredData: DataModel[] = [];
  private filteredDeltaData: DataModel[] = [];
  public graphData: GraphData = new GraphData();

  constructor(private dataService: DataService) {
  }

  private static ediff1d(v: number[]): number[] {
    const d: number[] = [];
    for (let i = 0; i < v.length; i++) {
      if (i === v.length - 1) {
        d.push(0);
      } else {
        d.push(v[i] - v[i + 1]);
      }
    }
    return d;
  }

  ngOnInit(): void {
    this.dataService.data.subscribe(data => {
      this.data = data;
      this.createDeltaData();
      this.filterDataset();
    });
  }

  createDeltaData(): void {
    this.deltaData = [];
    const date = this.data.map(d => d.date);
    const totalCases = ChartsComponent.ediff1d(this.data.map(d => d.totalCases));
    const activeCases = ChartsComponent.ediff1d(this.data.map(d => d.activeCases));
    const recovered = ChartsComponent.ediff1d(this.data.map(d => d.recovered));
    const deaths = ChartsComponent.ediff1d(this.data.map(d => d.deaths));
    const hospitalized = ChartsComponent.ediff1d(this.data.map(d => d.hospitalized));
    const icHospitalized = ChartsComponent.ediff1d(this.data.map(d => d.icHospitalized));
    const tests = ChartsComponent.ediff1d(this.data.map(d => d.tests));
    for (let i = 0; i < this.data.length; i++) {
      const data = new DataModel();
      data.date = date[i];
      data.totalCases = totalCases[i];
      data.activeCases = activeCases[i];
      data.recovered = recovered[i];
      data.deaths = deaths[i];
      data.hospitalized = hospitalized[i];
      data.icHospitalized = icHospitalized[i];
      data.tests = tests[i];
      this.deltaData.push(data);
    }
  }

  filterDataset(): void {
    this.filteredData = this.data
      .filter(d => moment(d.date).isSameOrAfter(this.fromDate, 'day'))
      .filter(d => moment(d.date).isSameOrBefore(this.toDate, 'day'));
    this.filteredDeltaData = this.deltaData
      .filter(d => moment(d.date).isSameOrAfter(this.fromDate, 'day'))
      .filter(d => moment(d.date).isSameOrBefore(this.toDate, 'day'));
    this.plot();
  }

  plot(): void {
    const graphData = new GraphData();
    if (this.filteredData.length > 0) {
      const x = this.filteredData.map(d => d.date);
      graphData.data = {
        data: [
          {
            x,
            y: this.filteredData.map(d => d.totalCases),
            name: 'Total cases',
            line: { shape: 'spline' },
          },
          {
            x,
            y: this.filteredData.map(d => d.activeCases),
            name: 'Active cases',
            line: { shape: 'spline' },
          },
          {
            x,
            y: this.filteredData.map(d => d.recovered),
            name: 'Recovered',
            line: { shape: 'spline' },
          },
          {
            x,
            y: this.filteredData.map(d => d.deaths),
            name: 'Deaths',
            line: { shape: 'spline' },
          },
        ],
        layout: { title: 'Data', }
      };
      graphData.delta = {
        data: [
          {
            x,
            y: this.filteredDeltaData.map(d => d.totalCases),
            name: 'Total cases',
            line: { shape: 'spline' },
          },
          {
            x,
            y: this.filteredDeltaData.map(d => d.activeCases),
            name: 'Active cases',
            line: { shape: 'spline' },
          },
          {
            x,
            y: this.filteredDeltaData.map(d => d.recovered),
            name: 'Recovered',
            line: { shape: 'spline' },
          },
          {
            x,
            y: this.filteredDeltaData.map(d => d.deaths),
            name: 'Deaths',
            line: { shape: 'spline' },
          },
        ],
        layout: { title: 'Variations' }
      };
      graphData.hospitalized = {
        data: [
          {
            x,
            y: this.filteredData.map(d => d.hospitalized),
            name: 'Hospitalized',
            line: { shape: 'spline' },
          },
          {
            x,
            y: this.filteredData.map(d => d.icHospitalized),
            name: 'ICU',
            line: { shape: 'spline' },
          },
        ],
        layout: { title: 'Hospitalized' }
      };
      graphData.deltaHospitalized = {
        data: [
          {
            x,
            y: this.filteredDeltaData.map(d => d.hospitalized),
            name: 'Hospitalized',
            line: { shape: 'spline' },
          },
          {
            x,
            y: this.filteredDeltaData.map(d => d.icHospitalized),
            name: 'ICU',
            line: { shape: 'spline' },
          }
        ],
        layout: { title: 'Hospitalized Variations' }
      };
      graphData.positivePercentage = {
        data: [{
          x,
          y: this.filteredDeltaData.map(d => d.totalCases / d.tests),
          showLegend: false,
          line: { shape: 'spline' },
        }],
        layout: { title: 'Positive percentage' }
      };
    }
    this.graphData = graphData;
  }
}
