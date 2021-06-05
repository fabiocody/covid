import {Injectable} from '@angular/core';

interface Script {
  name: string;
  src: string;
}

export class LoadableScripts {
  public static plotlyItLocale: Script = {
    name: 'plotlyItLocale',
    src: 'https://cdn.plot.ly/plotly-locale-it-latest.js'
  };
}

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {
  constructor() {
  }

  public load(script: Script): void {
    let scriptTag = document.getElementsByTagName('script').namedItem(script.name);
    if (scriptTag) {
      return;
    } else {
      scriptTag = document.createElement('script');
      scriptTag.id = script.name;
      scriptTag.type = 'text/javascript';
      scriptTag.src = script.src;
      document.getElementsByTagName('body')[0].appendChild(scriptTag);
    }
  }

  public unload(script: Script): void {
    const scriptTag = document.getElementsByTagName('script').namedItem(script.name);
    if (scriptTag) {
      scriptTag.remove();
    }
  }
}
