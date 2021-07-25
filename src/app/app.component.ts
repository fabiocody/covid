import {Component, OnInit} from '@angular/core';
import {UpdateService} from './services/update/update.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'COVID';

    constructor(private updateService: UpdateService) {}

    ngOnInit(): void {
        this.updateService.start();
    }
}
