import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const query = 'SELECT ?regionLabel ?population WHERE {\n' +
  '  SERVICE wikibase:label { bd:serviceParam wikibase:language "it" } .\n' +
  '  {\n' +
  '    ?region wdt:P31 wd:Q16110 .\n' +
  '    ?region wdt:P1082 ?population .\n' +
  '  } UNION {\n' +
  '    BIND(wd:Q38 as ?region) .\n' +
  '    ?region wdt:P1082 ?population .\n' +
  '  }\n' +
  '}';

interface ResultInterface {
  results: {
    bindings: [
      {
        population: {
          value: number
        },
        regionLabel: {
          value: string
        }
      }
    ]
  };
}

@Injectable({
  providedIn: 'root'
})
export class PopulationService {
  public population: ResultInterface | undefined;

  constructor(private http: HttpClient) {
    this.retrieveData();
  }

  private retrieveData(): void {
    this.http.get<ResultInterface>('https://query.wikidata.org/sparql?query=' + query).subscribe(result => {
      this.population = result;
    });
  }

  public get(region: string): number | undefined {
    const binding = this.population?.results.bindings.find(b => b.regionLabel.value === region);
    return binding != null ? binding.population.value : undefined;
  }
}
