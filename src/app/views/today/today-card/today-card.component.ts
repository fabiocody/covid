import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-today-card',
  templateUrl: './today-card.component.html',
  styleUrls: ['./today-card.component.scss']
})
export class TodayCardComponent implements OnInit {
  @Input() title = '';
  @Input() data = 0;
  @Input() delta = 0;
  @Input() icon = '';
  @Input() color = '';

  constructor() { }

  ngOnInit(): void {
  }
}
