import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private _http: HttpClient) { }

  getEmpresas(): Observable<any> {
    return this._http.get('http://localhost:8080/mensajeProyect/public/index.php/empresa/');
  }


  getMensajes(): Observable<any> {
    return this._http.get('http://localhost:8080/mensajeProyect/public/index.php/mensaje/');
  }

  public getMensajes2(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get("http://localhost:8080/mensajeProyect/public/index.php/mensaje/",
      httpOption);
  }

}
