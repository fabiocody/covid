import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../services/data/data.service';


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
  public REGIONS = ['Italia', 'Lombardia', 'Veneto', 'Campania', 'Lazio'];
  public selectedRegion = '';
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
      label: '',
      icon: 'place',
      routerLink: '',
    },
  ];

  constructor(private dataService: DataService) {
    const localRegion = localStorage.getItem('region');
    if (localRegion == null) {
      this.selectedRegion = this.REGIONS[0];
      localStorage.setItem('region', this.selectedRegion);
    } else {
      this.selectedRegion = localRegion;
    }
  }

  ngOnInit(): void {
  }

  public onSelectMenuItem(item: string): void {
    this.selectedRegion = item;
    localStorage.setItem('region', item);
    this.dataService.retrieveData();
  }
}
