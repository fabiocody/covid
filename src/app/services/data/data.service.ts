import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {DataModel} from '../../model/DataModel';
import {Papa} from 'ngx-papaparse';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  static DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv';

  private dataSubject: BehaviorSubject<DataModel[]>;
  public data: Observable<DataModel[]>;

  constructor(private papa: Papa) {
    this.dataSubject = new BehaviorSubject<DataModel[]>([]);
    this.data = this.dataSubject.asObservable();
    this.retrieveData();
  }

  public getDataValue(): DataModel[] {
    return this.dataSubject.value;
  }

  public retrieveData(): void {
    this.papa.parse(DataService.DATA_URL, {
      download: true,
      header: true,
      worker: true,
      complete: results => {
        this.dataSubject.next(
          (results.data as any[])
            .map(d => DataModel.fromObject(d))
            .filter(d => d !== null)
            .map(d => d as DataModel)
            .reverse()
        );
      }
    });
  }
}
