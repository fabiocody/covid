import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {DataModel} from '../../model/DataModel';
import {SubSink} from 'subsink';
import {UpdateService} from '../../services/update/update.service';
import {DateService} from '../../services/date/date.service';

@Component({
    selector: 'app-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit, OnDestroy {
    public todayData: DataModel = new DataModel();
    public deltaData = new DataModel();
    public yesterdayDeltaData = new DataModel();
    public sevenDaysDelta = new DataModel();
    public lastWeekDelta = new DataModel();
    public fourWeeksDelta = new DataModel();
    private subs = new SubSink();

    constructor(private dataService: DataService, private updateService: UpdateService) {}

    ngOnInit(): void {
        this.subs.sink = this.dataService.data.subscribe(data => {
            this.todayData = data[0];
            if (this.todayData && DateService.addDays(new Date(), -1) > this.todayData.date) {
                this.updateService.openSnackBar();
            }
            const yesterdayData = data[1];
            for (const key in this.todayData) {
                if (this.todayData.hasOwnProperty(key)) {
                    this.deltaData[key] = this.todayData[key] - yesterdayData[key];
                    this.sevenDaysDelta[key] = this.todayData[key] - data[7][key];
                    this.lastWeekDelta[key] = data[7][key] - data[8][key];
                    this.yesterdayDeltaData[key] = yesterdayData[key] - data[2][key];
                    this.fourWeeksDelta[key] = this.todayData[key] - data[28][key];
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
