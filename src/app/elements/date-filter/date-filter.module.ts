import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateFilterComponent} from './date-filter.component';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {AppDateAdapter} from '../../i18n/AppDateAdapter';

@NgModule({
    declarations: [DateFilterComponent],
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
    exports: [DateFilterComponent],
    providers: [{provide: DateAdapter, useClass: AppDateAdapter}],
})
export class DateFilterModule {}
