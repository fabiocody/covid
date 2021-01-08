import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  public REGIONS = ['Italia', 'Lombardia', 'Veneto', 'Campania', 'Lazio'];
  private selectedRegionSubject = new BehaviorSubject<string>('');
  public selectedRegion = this.selectedRegionSubject.asObservable();

  constructor() {
    let region = localStorage.getItem('region');
    console.log('SAVED REGION', region);
    if (region == null || this.REGIONS.find(r => r === region) == null) {
      region = this.REGIONS[0];
      localStorage.setItem('region', region);
    }
    this.selectedRegionSubject.next(region);
  }

  getRegion(): string {
    return this.selectedRegionSubject.value;
  }

  setRegion(region: string): void {
    console.log('setRegion', region);
    this.selectedRegionSubject.next(region);
  }
}
