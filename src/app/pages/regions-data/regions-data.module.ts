import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegionsDataRoutingModule} from './regions-data-routing.module';
import {RegionsDataComponent} from './regions-data.component';
import {FormsModule} from '@angular/forms';
import {DateFilterModule} from '../../elements/date-filter/date-filter.module';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
    declarations: [RegionsDataComponent],
    imports: [
        RegionsDataRoutingModule,
        CommonModule,
        FormsModule,
        DateFilterModule,
        MatCardModule,
        MatSlideToggleModule,
        MatTableModule,
        MatSortModule,
    ],
})
export class RegionsDataModule {}
