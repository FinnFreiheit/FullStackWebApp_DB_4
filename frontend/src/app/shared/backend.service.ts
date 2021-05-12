/*
* Service für HTTP
* Anfragen an Backend.
* */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // Klassen Variablen
  baseUrl = 'http://localhost:3000/singers';

  constructor(private http: HttpClient) { }

  /* Funktionen, die vom Backend ausgeführt werden mussen */
  getAll(): Observable<Data[]>{
    return this.http.get<Data[]>(this.baseUrl)
  }

  getDataById(dataId: number): Observable<Data> {
    return this.http.get<Data>(this.baseUrl + '/' + dataId);
  }

  update(dataId: number, data: Data): void {
    this.http.put<Data>(this.baseUrl + '/' + dataId, data)
      .subscribe(
        response => {
          console.log(response);
          console.log(response.SingerID);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteOne(dataId: number): void {
    this.http.delete<Data>(this.baseUrl + '/' + dataId)
      .subscribe(
        response => {
          console.log(response);
          console.log(response.SingerID);
        },
        error => {
          console.log(error);
        }
      );
  }

  create(data: Data): void {
    this.http.post<Data>(this.baseUrl, data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

}