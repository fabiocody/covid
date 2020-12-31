import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {DataModel} from '../../model/DataModel';


@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  public todayData: DataModel = new DataModel();
  private yesterdayData: DataModel = new DataModel();
  public deltaData = new DataModel();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.data.subscribe(data => {
      this.todayData = data[0];
      this.yesterdayData = data[1];
      // tslint:disable-next-line:forin
      for (const key in this.todayData) {
        // @ts-ignore
        this.deltaData[key] = this.todayData[key] - this.yesterdayData[key];
      }
    });
  }
}
