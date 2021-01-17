import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
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

  private static compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnInit(): void {
    this.dataService.regionsData.subscribe(data => {
      const maxDate = max(data.map(d => moment(d.date)));
      const filteredData = data.filter(d => moment(d.date).isSame(maxDate));
      this.dataSource = new MatTableDataSource<DataModel>(filteredData);
      this.sortData({active: 'region', direction: 'asc'});
    });
  }

  public sortData(sort: Sort): void {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'region': return RegionsDataComponent.compare(a.region, b.region, isAsc);
        case 'total': return RegionsDataComponent.compare(a.totalCases, b.totalCases, isAsc);
        case 'active': return RegionsDataComponent.compare(a.activeCases, b.activeCases, isAsc);
        case 'recovered': return RegionsDataComponent.compare(a.recovered, b.recovered, isAsc);
        case 'deaths': return RegionsDataComponent.compare(a.deaths, b.deaths, isAsc);
        case 'hospitalized': return RegionsDataComponent.compare(a.hospitalized, b.hospitalized, isAsc);
        case 'icu': return RegionsDataComponent.compare(a.icu, b.icu, isAsc);
        case 'tests': return RegionsDataComponent.compare(a.tests, b.tests, isAsc);
        default: return 0;
      }
    });
  }
}
