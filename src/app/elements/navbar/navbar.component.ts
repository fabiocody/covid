import {Component, Input, OnInit} from '@angular/core';
import {RegionsService} from '../../services/regions/regions.service';


export interface NavbarItem {
  label: string;
  icon: string;
  routerLink: string;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
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
      routerLink: 'region-data'
    },
    {
      label: '',
      icon: 'place',
      routerLink: '',
    },
  ];

  constructor(public regionsService: RegionsService) {
  }

  ngOnInit(): void {
  }

  public onSelectMenuItem(item: string): void {
    this.regionsService.setRegion(item);
  }
}
