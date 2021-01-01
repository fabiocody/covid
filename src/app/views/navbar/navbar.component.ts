import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() public title = '';
  public REGIONS = ['Italy'];
  public selectedRegion = '';

  constructor() {
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
    console.log(item);
  }
}
