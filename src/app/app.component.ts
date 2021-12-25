import {Component, OnDestroy, OnInit} from '@angular/core';
import {UpdateService} from './services/update/update.service';
import {NavigationEnd, Router} from '@angular/router';
import {SubSink} from 'subsink';

// eslint-disable-next-line @typescript-eslint/ban-types
declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'COVID';
    private subs = new SubSink();

    constructor(private updateService: UpdateService, private router: Router) {}

    public ngOnInit(): void {
        this.updateService.start();
        this.subs.sink = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'G-LCT3Z0YENG', {
                    page_path: event.urlAfterRedirects,
                });
            }
        });
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
