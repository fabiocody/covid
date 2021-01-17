import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DataService} from '../../services/data/data.service';
import {DataModel} from '../../model/DataModel';
import * as moment from 'moment';
import {max} from 'moment';

@Component({
  selector: 'app-regions-data',
  templateUrl: './regions-data.component.html',
  styleUrls: ['./regions-data.component.scss']
})
export class RegionsDataComponent implements OnInit {
  public COLUMNS = ['region', 'total', 'active', 'recovered', 'deaths', 'hospitalized', 'icu', 'tests'];
  public dataSource = new MatTableDataSource<DataModel>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.regionsData.subscribe(data => {
      const maxDate = max(data.map(d => moment(d.date)));
      const filteredData = data.filter(d => moment(d.date).isSame(maxDate));
      this.dataSource = new MatTableDataSource<DataModel>(filteredData);
      console.log(filteredData);
    });
  }
}
