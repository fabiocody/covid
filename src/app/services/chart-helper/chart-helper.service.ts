import {Injectable} from '@angular/core';
import {ChartHelperModule} from './chart-helper.module';
import {DataModel} from '../../model/DataModel';

@Injectable({
    providedIn: ChartHelperModule,
})
export class ChartHelperService {
    public readonly CONFIG = {locale: 'it-IT'};

    public getYRange(data: DataModel[], ys: string[], count: number): number[] {
        const slice = data.slice(0, count);
        const values = slice.map(d => ys.map(y => d[y])).reduce((arr, v) => arr.concat(...v), []);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const delta = max - min;
        return [min - delta * 0.05, max + delta * 0.05];
    }
}
