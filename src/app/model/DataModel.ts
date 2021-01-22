import * as moment from 'moment';

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
  positiveTestsRatio!: number;

  static fromObject(object: any): DataModel | null {
    if (object != null && object.data !== '') {
      const data = new DataModel();
      data.date = moment.utc(object.data).toDate();
      data.region = object.hasOwnProperty('denominazione_regione') ? object.denominazione_regione : 'Italia';
      data.totalCases = parseFloat(object.totale_casi);
      data.activeCases = parseFloat(object.totale_positivi);
      data.recovered = parseFloat(object.dimessi_guariti);
      data.deaths = parseFloat(object.deceduti);
      data.hospitalized = parseFloat(object.totale_ospedalizzati);
      data.icu = parseFloat(object.terapia_intensiva);
      data.tests = parseFloat(object.tamponi);
      return data;
    } else {
      return null;
    }
  }

  static cloneWithPopulation(origin: DataModel, population: number): DataModel {
    const data = new DataModel();
    data.date = origin.date;
    data.region = origin.region;
    data.totalCases = Math.round(origin.totalCases / population * 100000);
    data.activeCases = Math.round(origin.activeCases / population * 100000);
    data.recovered = Math.round(origin.recovered / population * 100000);
    data.deaths = Math.round(origin.deaths / population * 100000);
    data.hospitalized = Math.round(origin.hospitalized / population * 100000);
    data.icu = Math.round(origin.icu / population * 100000);
    data.tests = Math.round(origin.tests / population * 100000);
    return data;
  }

  static computePositiveTestsRatio(recent: DataModel, old?: DataModel): number {
    if (old === undefined) {
      return recent.totalCases / recent.tests * 100;
    }
    return (recent.totalCases - old.totalCases) / (recent.tests - old.tests) * 100;
  }
}
