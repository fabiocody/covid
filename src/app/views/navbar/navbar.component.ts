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
  public REGIONS = ['Italy', 'Lombardy'];
  public selectedRegion = '';
  public navbarItems: NavbarItem[] = [
    {
      label: 'Today',
      icon: 'today',
      routerLink: 'today',
    },
    {
      label: 'Charts',
      icon: 'timeline',
      routerLink: 'charts',
    },
    {
      label: 'Data',
      icon: 'table_rows',
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
