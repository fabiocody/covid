import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataModel} from '../../model/DataModel';
import {DataService} from '../../services/data/data.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import * as moment from 'moment';
import {SubSink} from 'subsink';
import {DeltaService} from '../../services/delta/delta.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {
  public COLUMNS = ['date', 'total', 'active', 'recovered', 'deaths', 'hospitalized', 'icu', 'tests', 'ptPercent'];
  private data: DataModel[] = [];
  private dataSource = new MatTableDataSource<DataModel>();
  public filteredDataSource = new MatTableDataSource<DataModel>();
  public toDate = moment().toDate();
  public fromDate = moment().subtract(1, 'month').toDate();
  private delta = false;
  private populationRatio = false;
  private subs = new SubSink();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.subs.sink = this.dataService.data.subscribe(data => {
      this.data = data;
      this.toDate = data.length > 0 ? data[0].date : moment().toDate();
      this.fromDate = moment(this.toDate).subtract(1, 'month').toDate();
      this.populateTable();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.filteredDataSource.paginator = this.paginator;
  }

  public populateTable(): void {
    this.dataSource.data = this.data;
    if (this.delta) {
      this.dataSource.data = DeltaService.createDelta(this.dataSource.data);
    }
    if (this.populationRatio) {
      this.dataSource.data = this.dataSource.data.map(d => DataModel.cloneWithPopulation(d, this.dataService.population[d.region]));
    }
    this.filterDataset();
  }

  public filterDataset(): void {
    this.filteredDataSource.data = this.dataSource.data
      .filter(d => moment(d.date).isSameOrAfter(this.fromDate, 'day'))
      .filter(d => moment(d.date).isSameOrBefore(this.toDate, 'day'));
    this.filteredDataSource.paginator = this.paginator;
  }

  public setDelta(delta: boolean): void {
    this.delta = delta;
    this.populateTable();
  }

  public setPopulationRatio(value: boolean): void {
    this.populationRatio = value;
    this.populateTable();
  }
}
