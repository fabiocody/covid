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
  public deltaData = new DataModel();
  public yesterdayDeltaData = new DataModel();
  public sevenDaysDelta = new DataModel();
  public lastWeekDelta = new DataModel();
  public fourWeeksDelta = new DataModel();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.data.subscribe(data => {
      this.todayData = data[0];
      const yesterdayData = data[1];
      // tslint:disable-next-line:forin
      for (const key in this.todayData) {
        // @ts-ignore
        this.deltaData[key] = this.todayData[key] - yesterdayData[key];
        // @ts-ignore
        this.sevenDaysDelta[key] = this.todayData[key] - data[7][key];
        // @ts-ignore
        this.lastWeekDelta[key] = data[7][key] - data[8][key];
        // @ts-ignore
        this.yesterdayDeltaData[key] = yesterdayData[key] - data[2][key];
        // @ts-ignore
        this.fourWeeksDelta[key] = this.todayData[key] - data[28][key];
      }
    });
  }
}
