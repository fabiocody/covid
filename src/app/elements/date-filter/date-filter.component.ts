import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {
  @Input() public fromDate: Date = new Date();
  @Output() public fromDateChange: EventEmitter<Date> = new EventEmitter();
  @Input() public toDate: Date = new Date();
  @Output() public toDateChange: EventEmitter<Date> = new EventEmitter();
  @Input() public showToDate = true;

  constructor() {
  }

  ngOnInit(): void {
  }
}
