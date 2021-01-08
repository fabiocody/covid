import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataModel} from '../../model/DataModel';
import {Papa} from 'ngx-papaparse';
import {RegionsService} from '../regions/regions.service';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static ITALY_DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv';
  private static REGIONS_DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv';

  private dataSubject = new BehaviorSubject<DataModel[]>([]);
  public data = this.dataSubject.asObservable();

  constructor(
    private regionsService: RegionsService,
    private papa: Papa
  ) {
    this.regionsService.selectedRegion.subscribe(region => this.retrieveData(region));
  }

  public retrieveData(region: string): void {
    console.log('retrieveData', region);
    let url: string;
    if (region === 'Italia') {
      url = DataService.ITALY_DATA_URL;
    } else {
      url = DataService.REGIONS_DATA_URL;
    }
    this.papa.parse(url, {
      download: true,
      header: true,
      worker: true,
      complete: results => {
        this.dataSubject.next(
          (results.data as any[])
            .filter(d => d.hasOwnProperty('denominazione_regione') ? d.denominazione_regione === region : true)
            .map(d => DataModel.fromObject(d))
            .filter(d => d !== null)
            .map(d => d as DataModel)
            .reverse()
        );
      }
    });
  }
}
