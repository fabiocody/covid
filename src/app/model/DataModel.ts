import * as moment from 'moment';

export class DataModel {
  date!: Date;
  totalCases!: number;
  activeCases!: number;
  recovered!: number;
  deaths!: number;
  hospitalized!: number;
  icHospitalized!: number;
  tests!: number;
  /*deltaTotalCases!: number;
  deltaActiveCases!: number;
  deltaRecovered!: number;
  deltaDeaths!: number;
  deltaHospitalized!: number;
  deltaSymptomaticHospitalized!: number;
  deltaIcHospitalized!: number;
  deltaTests!: number;*/

  static fromObject(object: any): DataModel | null {
    if (object != null && object.data !== '') {
      const data = new DataModel();
      data.date = moment(object.data).toDate();
      data.totalCases = object.totale_casi;
      data.activeCases = object.totale_positivi;
      data.recovered = object.dimessi_guariti;
      data.deaths = object.deceduti;
      data.hospitalized = object.totale_ospedalizzati;
      data.icHospitalized = object.terapia_intensiva;
      data.tests = object.tamponi;
      return data;
    } else {
      return null;
    }
  }
}
