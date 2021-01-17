import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataModel} from '../../model/DataModel';
import {Papa} from 'ngx-papaparse';
import {RegionsService} from '../regions/regions.service';
import {ParseResult} from 'ngx-papaparse/lib/interfaces/parse-result';
import {SpinnerService} from '../spinner/spinner.service';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private ITALY_DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv';
  private REGIONS_DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv';

  private italyDataSubject = new BehaviorSubject<DataModel[]>([]);
  private regionsDataSubject = new BehaviorSubject<DataModel[]>([]);
  public regionsData = this.regionsDataSubject.asObservable();
  private dataSubject = new BehaviorSubject<DataModel[]>([]);
  public data = this.dataSubject.asObservable();

  constructor(
    private spinnerService: SpinnerService,
    private regionsService: RegionsService,
    private papa: Papa
  ) {
    this.downloadData();
  }

  private downloadData(): void {
    this.spinnerService.show();
    this.papa.parse(this.ITALY_DATA_URL, {
      download: true,
      header: true,
      worker: true,
      complete: italyResults => {
        this.onPapaComplete(italyResults, true).then(() => {
          this.papa.parse(this.REGIONS_DATA_URL, {
            download: true,
            header: true,
            worker: true,
            complete: regionsResults => this.onPapaComplete(regionsResults, false).then(() => {
              this.regionsService.selectedRegion.subscribe(region => this.retrieveData(region));
              this.spinnerService.hide();
            })
          });
        });
      }
    });
  }

  private async onPapaComplete(results: ParseResult, italy: boolean): Promise<void> {
    const data = (results.data as any[])
      .map(d => DataModel.fromObject(d))
      .filter(d => d !== null)
      .map(d => d as DataModel)
      .reverse();
    if (italy) {
      this.italyDataSubject.next(data);
    } else {
      this.regionsDataSubject.next(data);
    }
  }

  public retrieveData(region: string): void {
    console.log('retrieveData', region);
    if (region === 'Italia') {
      this.dataSubject.next(this.italyDataSubject.value);
    } else {
      this.dataSubject.next(this.regionsDataSubject.value.filter(d => d.region === region));
    }
  }
}
