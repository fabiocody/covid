import {Component, OnInit, ViewChild} from '@angular/core';
import {DataModel} from '../../model/DataModel';
import {DataService} from '../../services/data/data.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import * as moment from 'moment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  public COLUMNS = ['date', 'total', 'active', 'recovered', 'deaths', 'hospitalized', 'icHospitalized', 'tests'];
  private dataSource = new MatTableDataSource<DataModel>();
  public filteredDataSource = new MatTableDataSource<DataModel>();
  public toDate = this.dataSource.data.length > 0 ? this.dataSource.data[0].date : moment().toDate();
  public fromDate = moment(this.toDate).subtract(1, 'month').toDate();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.data.subscribe(data => {
      this.dataSource = new MatTableDataSource<DataModel>(data);
      this.filterDataset();
    });
  }

  filterDataset(): void {
    this.filteredDataSource.data = this.dataSource.data
      .filter(d => moment(d.date).isSameOrAfter(this.fromDate, 'day'))
      .filter(d => moment(d.date).isSameOrBefore(this.toDate, 'day'));
    this.filteredDataSource.paginator = this.paginator as MatPaginator;
  }
}
