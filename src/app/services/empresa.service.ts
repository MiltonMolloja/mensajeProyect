import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private _http:HttpClient) { }

  getEmpresas():Observable<any>
  {
     return this._http.get('localhost:8080/mensajeProyect/public/index.php/empresa/');
   }
}
