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

  static fromObject(object: any): DataModel | null {
    if (object != null && object.data !== '') {
      const data = new DataModel();
      data.date = moment(object.data).toDate();
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
}
