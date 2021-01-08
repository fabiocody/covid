import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class AppMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.getAndInitTranslations();
  }

  getAndInitTranslations(): void {
    this.firstPageLabel = 'Prima pagina';
    this.lastPageLabel = 'Ultima pagina';
    this.nextPageLabel = 'Pagina successiva';
    this.previousPageLabel = 'Pagina precedente';
    this.itemsPerPageLabel = 'Elementi per pagina';
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '0 di ' +  length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex  + ' di ' + length;
  }
}
