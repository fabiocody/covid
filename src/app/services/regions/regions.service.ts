import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RegionsService {
    public REGIONS = [
        'Italia',
        'Abruzzo',
        'Basilicata',
        'Calabria',
        'Campania',
        'Emilia-Romagna',
        'Friuli Venezia Giulia',
        'Lazio',
        'Liguria',
        'Lombardia',
        'Marche',
        'Molise',
        'P.A. Bolzano',
        'P.A. Trento',
        'Piemonte',
        'Puglia',
        'Sardegna',
        'Sicilia',
        'Toscana',
        'Umbria',
        "Valle d'Aosta",
        'Veneto',
    ];
    private selectedRegionSubject = new BehaviorSubject<string>(this.REGIONS[0]);
    public selectedRegion = this.selectedRegionSubject.asObservable();

    getRegion(): string {
        return this.selectedRegionSubject.value;
    }

    setRegion(region: string): void {
        this.selectedRegionSubject.next(region);
    }
}
