import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import '@angular/common/locales/global/it';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './elements/navbar/navbar.component';
import {MatIconRegistry} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {SpinnerComponent} from './elements/spinner/spinner.component';
import {MaterialModule} from './modules/material.module';
import * as moment from 'moment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'it'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    moment.locale('it');
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
