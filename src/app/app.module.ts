import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import '@angular/common/locales/global/it';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './elements/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {TodayComponent} from './pages/today/today.component';
import {ChartsComponent} from './pages/charts/charts.component';
import {DataTableComponent} from './pages/data-table/data-table.component';
import {TodayCardComponent} from './pages/today/today-card/today-card.component';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MomentModule} from 'ngx-moment';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMatPaginatorIntl} from './i18n/AppMatPaginatorIntl';
import * as moment from 'moment';
import {PlotlyViaCDNModule} from 'angular-plotly.js';
import { RegionsDataComponent } from './pages/region-data/regions-data.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SpinnerComponent } from './elements/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';

PlotlyViaCDNModule.setPlotlyVersion('1.58.4');
PlotlyViaCDNModule.setPlotlyBundle('basic');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodayComponent,
    ChartsComponent,
    DataTableComponent,
    TodayCardComponent,
    RegionsDataComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MomentModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    PlotlyViaCDNModule,
    MatTooltipModule,
    MatDividerModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSortModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'it'},
    {provide: MatPaginatorIntl, useClass: AppMatPaginatorIntl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    moment.locale('it');
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
