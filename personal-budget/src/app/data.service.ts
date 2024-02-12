

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataItems: any[] = [];

  constructor(private http: HttpClient) {}

  fetchDataFromBackend(): void {
    if (this.dataItems.length === 0) {

      this.http.get<any[]>('./').subscribe((data) => {
        this.dataItems = data;
      });
    }
  }

  getDataItems(): any[] {
    return this.dataItems;
  }
}
