import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableRoutingModule} from './data-table-routing.module';
import {DataTableComponent} from './data-table.component';
import {FormsModule} from '@angular/forms';
import {DateFilterModule} from '../../elements/date-filter/date-filter.module';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {AppMatPaginatorIntl} from '../../i18n/AppMatPaginatorIntl';

@NgModule({
    declarations: [DataTableComponent],
    imports: [
        DataTableRoutingModule,
        CommonModule,
        FormsModule,
        DateFilterModule,
        MatCardModule,
        MatSlideToggleModule,
        MatTableModule,
        MatPaginatorModule,
    ],
    providers: [{provide: MatPaginatorIntl, useClass: AppMatPaginatorIntl}],
})
export class DataTableModule {}
