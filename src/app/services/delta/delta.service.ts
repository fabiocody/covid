import {DataModel} from '../../model/DataModel';

interface MultiDataModel {
    date: Date[];
    region: string[];
    totalCases: number[];
    activeCases: number[];
    recovered: number[];
    deaths: number[];
    hospitalized: number[];
    icu: number[];
    tests: number[];
    positiveTestsRatio: number[];
}

export class DeltaService {
    private static ediff1d(v: number[]): number[] {
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

    private static createMultiDataModel(data: DataModel[]): MultiDataModel {
        return {
            date: data.map(d => d.date),
            region: data.map(d => d.region),
            totalCases: DeltaService.ediff1d(data.map(d => d.totalCases)),
            activeCases: DeltaService.ediff1d(data.map(d => d.activeCases)),
            recovered: DeltaService.ediff1d(data.map(d => d.recovered)),
            deaths: DeltaService.ediff1d(data.map(d => d.deaths)),
            hospitalized: DeltaService.ediff1d(data.map(d => d.hospitalized)),
            icu: DeltaService.ediff1d(data.map(d => d.icu)),
            tests: DeltaService.ediff1d(data.map(d => d.tests)),
            positiveTestsRatio: DeltaService.ediff1d(data.map(d => d.positiveTestsRatio)),
        };
    }

    public static createDelta(data: DataModel[]): DataModel[] {
        const multiData = DeltaService.createMultiDataModel(data);
        const deltaData: DataModel[] = [];
        for (let i = 0; i < data.length; i++) {
            const dataModel = new DataModel();
            for (const key of Object.keys(multiData)) {
                dataModel[key] = multiData[key][i];
            }
            deltaData.push(dataModel);
        }
        return deltaData;
    }

    public static createWeekDelta(data: DataModel[]): DataModel[] {
        const multiData = DeltaService.createMultiDataModel(data);
        const deltaData: DataModel[] = [];
        for (let i = 0; i < data.length; i++) {
            const dataModel = new DataModel();
            for (const key of Object.keys(multiData)) {
                if (key === 'region') {
                    dataModel[key] = multiData[key][i];
                } else if (key === 'date') {
                    dataModel[key] = multiData[key][i];
                } else {
                    dataModel[key] = DeltaService.sumPrev7(multiData[key], i);
                }
            }
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
}
