import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataModel} from '../../model/DataModel';
import {Papa} from 'ngx-papaparse';
import {RegionsService} from '../regions/regions.service';
import {ParseResult} from 'ngx-papaparse/lib/interfaces/parse-result';
import {SpinnerService} from '../spinner/spinner.service';
import {SubSink} from 'subsink';



@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  private ITALY_DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv';
  private REGIONS_DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv';

  private italyDataSubject = new BehaviorSubject<DataModel[]>([]);
  private regionsDataSubject = new BehaviorSubject<DataModel[]>([]);
  public regionsData = this.regionsDataSubject.asObservable();
  private dataSubject = new BehaviorSubject<DataModel[]>([]);
  public data: Observable<DataModel[]> = this.dataSubject.asObservable();

  private subs = new SubSink();

  public population: { [region: string]: number } = {
    Italia: 59641488,
    Abruzzo: 1293941,
    Basilicata: 553254,
    Calabria: 1894110,
    Campania: 5712143,
    'Emilia-Romagna': 4464119,
    'Friuli Venezia Giulia': 1206216,
    Lazio: 5755700,
    Liguria: 1524826,
    Lombardia: 10027602,
    Marche: 1512672,
    Molise: 300516,
    'P.A. Bolzano': 532644,
    'P.A. Trento': 545425,
    Piemonte: 4311217,
    Puglia: 3953305,
    Sardegna: 1611621,
    Sicilia: 4875290,
    Toscana: 3692555,
    Umbria: 870165,
    'Valle d\'Aosta': 125034,
    Veneto: 4879133
  };

  constructor(
    private spinnerService: SpinnerService,
    private regionsService: RegionsService,
    private papa: Papa
  ) {
    this.downloadData();
  }

  static ediff1d(v: number[]): number[] {
    const d: number[] = [];
    for (let i = 0; i < v.length; i++) {
      if (i === v.length - 1) {
        d.push(0);
      } else {
        d.push(v[i] - v[i + 1]);
      }
    }
    return d;
  }

  static createDelta(data: DataModel[]): DataModel[] {
    const deltaData: DataModel[] = [];
    const regions = data.map(d => d.region);
    const date = data.map(d => d.date);
    const totalCases = DataService.ediff1d(data.map(d => d.totalCases));
    const activeCases = DataService.ediff1d(data.map(d => d.activeCases));
    const recovered = DataService.ediff1d(data.map(d => d.recovered));
    const deaths = DataService.ediff1d(data.map(d => d.deaths));
    const hospitalized = DataService.ediff1d(data.map(d => d.hospitalized));
    const icu = DataService.ediff1d(data.map(d => d.icu));
    const tests = DataService.ediff1d(data.map(d => d.tests));
    const positiveTestsRatio = DataService.ediff1d(data.map(d => d.positiveTestsRatio));
    for (let i = 0; i < data.length; i++) {
      const dataModel = new DataModel();
      dataModel.region = regions[i];
      dataModel.date = date[i];
      dataModel.totalCases = totalCases[i];
      dataModel.activeCases = activeCases[i];
      dataModel.recovered = recovered[i];
      dataModel.deaths = deaths[i];
      dataModel.hospitalized = hospitalized[i];
      dataModel.icu = icu[i];
      dataModel.tests = tests[i];
      dataModel.positiveTestsRatio = positiveTestsRatio[i];
      deltaData.push(dataModel);
    }
    return deltaData;
  }

  static createWeekDelta(data: DataModel[]): DataModel[] {
    const deltaData: DataModel[] = [];
    const regions = data.map(d => d.region);
    const date = data.map(d => d.date);
    const totalCases = DataService.ediff1d(data.map(d => d.totalCases));
    const activeCases = DataService.ediff1d(data.map(d => d.activeCases));
    const recovered = DataService.ediff1d(data.map(d => d.recovered));
    const deaths = DataService.ediff1d(data.map(d => d.deaths));
    const hospitalized = DataService.ediff1d(data.map(d => d.hospitalized));
    const icu = DataService.ediff1d(data.map(d => d.icu));
    const tests = DataService.ediff1d(data.map(d => d.tests));
    const positiveTestsRatio = DataService.ediff1d(data.map(d => d.positiveTestsRatio));
    for (let i = 0; i < data.length; i++) {
      const dataModel = new DataModel();
      dataModel.region = regions[i];
      dataModel.date = date[i];
      dataModel.totalCases = this.sumPrev7(totalCases, i);
      dataModel.activeCases = this.sumPrev7(activeCases, i);
      dataModel.recovered = this.sumPrev7(recovered, i);
      dataModel.deaths = this.sumPrev7(deaths, i);
      dataModel.hospitalized = this.sumPrev7(hospitalized, i);
      dataModel.icu = this.sumPrev7(icu, i);
      dataModel.tests = this.sumPrev7(tests, i);
      dataModel.positiveTestsRatio = this.sumPrev7(positiveTestsRatio, i);
      deltaData.push(dataModel);
    }
    return deltaData;
  }

  private static sumPrev7(data: number[], index: number): number {
    let sum = 0;
    for (let i = index, count = 0; i < data.length && count < 7; i++, count++) {
      sum += data[i];
    }
    return sum;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
              this.subs.sink = this.regionsService.selectedRegion.subscribe(region => this.retrieveData(region));
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
      for (let i = 0; i < data.length; i++) {
        data[i].positiveTestsRatio = DataModel.computePositiveTestsRatio(data[i], i < data.length - 1 ? data[i + 1] : undefined);
      }
      this.italyDataSubject.next(data);
    } else {
      for (const region of this.regionsService.REGIONS) {
        const regionData = data.filter(d => d.region === region);
        for (let i = 0; i < regionData.length; i++) {
          regionData[i].positiveTestsRatio =
            DataModel.computePositiveTestsRatio(regionData[i], i < regionData.length - 1 ? regionData[i + 1] : undefined);
        }
      }
      this.regionsDataSubject.next(data);
    }
  }

  public retrieveData(region: string): void {
    if (region === 'Italia') {
      this.dataSubject.next(this.italyDataSubject.value);
    } else {
      this.dataSubject.next(this.regionsDataSubject.value.filter(d => d.region === region));
    }
  }
}
