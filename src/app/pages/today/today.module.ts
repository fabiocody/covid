import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodayRoutingModule} from './today.routing.module';
import {TodayComponent} from './today.component';
import {TodayCardComponent} from './today-card/today-card.component';
import {MomentModule} from 'ngx-moment';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [TodayComponent, TodayCardComponent],
    imports: [
        TodayRoutingModule,
        CommonModule,
        MomentModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatTooltipModule,
    ],
})
export class TodayModule {}
