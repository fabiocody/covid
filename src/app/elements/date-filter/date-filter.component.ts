import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-date-filter',
    templateUrl: './date-filter.component.html',
    styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent {
    @Input() public fromDate: Date = new Date();
    @Output() public fromDateChange: EventEmitter<Date> = new EventEmitter();
    @Input() public toDate: Date = new Date();
    @Output() public toDateChange: EventEmitter<Date> = new EventEmitter();
    @Input() public showToDate = true;
}
