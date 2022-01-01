import {Injectable} from '@angular/core';

@Injectable()
export class AnalysisService {
    public sma(arr: number[], window: number): number[] {
        const res = [];
        for (let i = 0; i < window - 1; i++) {
            res.push(NaN);
        }
        for (let i = 0; i < arr.length - window + 1; i++) {
            res.push(this.avg(arr.slice(i, i + window)));
        }
        return res;
    }

    public avg(arr: number[]): number {
        return this.sum(arr) / arr.length;
    }

    public sum(arr: number[]): number {
        return arr.reduce((acc, curr) => acc + curr, 0);
    }
}
