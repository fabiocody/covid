import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  public REGIONS = ['Italia', 'Lombardia', 'Veneto', 'Campania', 'Lazio'];
  private selectedRegionSubject = new BehaviorSubject<string>(this.REGIONS[0]);
  public selectedRegion = this.selectedRegionSubject.asObservable();

  constructor() {
  }

  getRegion(): string {
    return this.selectedRegionSubject.value;
  }

  setRegion(region: string): void {
    this.selectedRegionSubject.next(region);
  }
}
