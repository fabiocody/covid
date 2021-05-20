import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AppDateAdapter} from '../i18n/AppDateAdapter';
import {AppMatPaginatorIntl} from '../i18n/AppMatPaginatorIntl';


@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatDividerModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSlideToggleModule,
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: AppMatPaginatorIntl},
    {provide: DateAdapter, useClass: AppDateAdapter},
  ]
})
export class MaterialModule {
}
