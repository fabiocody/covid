import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import '@angular/common/locales/global/it';
import {AppRoutingModule} from './app.routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './elements/navbar/navbar.component';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {SpinnerComponent} from './elements/spinner/spinner.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import * as moment from 'moment';

@NgModule({
    declarations: [AppComponent, NavbarComponent, SpinnerComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [{provide: LOCALE_ID, useValue: 'it'}],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        moment.locale('it');
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
    }
}
