import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(private http: HttpClient) { }
  obtenerLista(): Observable<any> {
    return this.http.get(environment.base_url)
  }
}
