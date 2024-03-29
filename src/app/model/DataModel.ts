export class DataModel {
    date!: Date;
    region!: string;
    totalCases!: number;
    activeCases!: number;
    recovered!: number;
    deaths!: number;
    hospitalized!: number;
    icu!: number;
    tests!: number;
    molecularTests!: number;
    antigenTests!: number;
    positiveTestsRatio!: number;

    public static fromObject(object: any): DataModel | null {
        if (object != null && object.data !== '') {
            const data = new DataModel();
            data.date = new Date(object.data + '+00:00');
            data.region = object.hasOwnProperty('denominazione_regione') ? object.denominazione_regione : 'Italia';
            data.totalCases = parseFloat(object.totale_casi);
            data.activeCases = parseFloat(object.totale_positivi);
            data.recovered = parseFloat(object.dimessi_guariti);
            data.deaths = parseFloat(object.deceduti);
            data.hospitalized = parseFloat(object.totale_ospedalizzati);
            data.icu = parseFloat(object.terapia_intensiva);
            data.tests = parseFloat(object.tamponi);
            data.molecularTests = parseFloat(object.tamponi_test_molecolare);
            data.antigenTests = parseFloat(object.tamponi_test_antigenico_rapido);
            return data;
        } else {
            return null;
        }
    }

    public static cloneWithPopulation(origin: DataModel, population: number): DataModel {
        const data = new DataModel();
        data.date = origin.date;
        data.region = origin.region;
        data.totalCases = Math.round((origin.totalCases / population) * 100000);
        data.activeCases = Math.round((origin.activeCases / population) * 100000);
        data.recovered = Math.round((origin.recovered / population) * 100000);
        data.deaths = Math.round((origin.deaths / population) * 100000);
        data.hospitalized = Math.round((origin.hospitalized / population) * 100000);
        data.icu = Math.round((origin.icu / population) * 100000);
        data.tests = Math.round((origin.tests / population) * 100000);
        data.molecularTests = Math.round((origin.molecularTests / population) * 100000);
        data.antigenTests = Math.round((origin.antigenTests / population) * 100000);
        return data;
    }

    public static computeTestRatio(recent: DataModel, old?: DataModel): number {
        if (old === undefined) {
            return (recent.totalCases / recent.tests) * 100;
        }
        return ((recent.totalCases - old.totalCases) / (recent.tests - old.tests)) * 100;
    }
}
