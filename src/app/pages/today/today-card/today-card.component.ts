import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-today-card',
    templateUrl: './today-card.component.html',
    styleUrls: ['./today-card.component.scss'],
})
export class TodayCardComponent {
    @Input() title = '';
    @Input() data = 0;
    @Input() delta = 0;
    @Input() icon = '';
    @Input() sevenDaysDelta = 0;
    @Input() fourWeeksDelta = 0;
    @Input() titleTooltip = '';
}
