import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public fromDate = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
  public toDate = new Date(Date.now());

  constructor() {
  }

  ngOnInit(): void {
  }

  filterDataset(): void {
    console.log('filterDataset');
  }
}
