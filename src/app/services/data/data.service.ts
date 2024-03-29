import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DataModel} from '../../model/DataModel';
import {HttpClient} from '@angular/common/http';
import {RegionsService} from '../regions/regions.service';
import {SpinnerService} from '../../elements/spinner/spinner.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private readonly ITALY_DATA_URL =
        'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json';
    private readonly REGIONS_DATA_URL =
        'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json';

    private italyDataSubject = new BehaviorSubject<DataModel[]>([]);
    private regionsDataSubject = new BehaviorSubject<DataModel[]>([]);
    public regionsData = this.regionsDataSubject.asObservable();
    private dataSubject = new BehaviorSubject<DataModel[]>([]);
    public data = this.dataSubject.asObservable();

    public population: {[region: string]: number} = {
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
        "Valle d'Aosta": 125034,
        Veneto: 4879133,
    };

    constructor(
        private spinnerService: SpinnerService,
        private regionsService: RegionsService,
        private http: HttpClient,
    ) {
        this.init().then();
    }

    private static computeTestRatio(d: DataModel, i: number, data: DataModel[]): void {
        d.positiveTestsRatio = DataModel.computeTestRatio(data[i], i < data.length - 1 ? data[i + 1] : undefined);
    }

    private async init(): Promise<void> {
        this.spinnerService.show();
        await this.downloadData(this.ITALY_DATA_URL);
        this.regionsService.selectedRegion.subscribe(region => this.retrieveData(region));
        this.spinnerService.hide();
        await this.downloadData(this.REGIONS_DATA_URL);
    }

    private async downloadData(url: string): Promise<void> {
        const data = (await this.http.get<any[]>(url).toPromise())
            .map(d => DataModel.fromObject(d))
            .filter(d => d !== null)
            .map(d => d as DataModel)
            .reverse();
        if (url === this.ITALY_DATA_URL) {
            data.forEach(DataService.computeTestRatio);
            this.italyDataSubject.next(data);
        } else if (url === this.REGIONS_DATA_URL) {
            for (const region of this.regionsService.REGIONS) {
                const regionData = data.filter(d => d.region === region);
                regionData.forEach(DataService.computeTestRatio);
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
