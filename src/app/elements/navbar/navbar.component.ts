import {Component, Input} from '@angular/core';
import {RegionsService} from '../../services/regions/regions.service';

export interface NavbarItem {
    label: string;
    icon: string;
    routerLink: string;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @Input() public title = '';

    public navbarItems: NavbarItem[] = [
        {
            label: 'Oggi',
            icon: 'today',
            routerLink: 'today',
        },
        {
            label: 'Grafici',
            icon: 'insert_chart',
            routerLink: 'charts',
        },
        {
            label: 'Dati',
            icon: 'text_snippet',
            routerLink: 'data-table',
        },
        {
            label: 'Dati regioni',
            icon: 'map',
            routerLink: 'regions-data',
        },
        {
            label: 'Analisi',
            icon: 'insights',
            routerLink: 'analysis',
        },
        {
            label: '',
            icon: 'place',
            routerLink: '',
        },
    ];

    constructor(public regionsService: RegionsService) {}

    public onSelectMenuItem(item: string): void {
        this.regionsService.setRegion(item);
    }
}
