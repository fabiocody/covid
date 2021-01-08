import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataModel} from '../../model/DataModel';
import {Papa} from 'ngx-papaparse';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static ITALY_DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv';
  private static REGIONS_DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv';

  private dataSubject: BehaviorSubject<DataModel[]>;
  public data: Observable<DataModel[]>;

  constructor(private papa: Papa) {
    this.dataSubject = new BehaviorSubject<DataModel[]>([]);
    this.data = this.dataSubject.asObservable();
    this.retrieveData();
  }

  public retrieveData(): void {
    const region = localStorage.getItem('region');
    let url: string;
    if (region === 'Italy') {
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
