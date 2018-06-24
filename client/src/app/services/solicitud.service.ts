import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global';

@Injectable()

export class SolicitudService {
    public URL: string;
    public token;
    public identity;

    constructor(public _http: HttpClient) {
        this.URL = GLOBAL.url;
    }

    nuevaSolicitud(token, solicitud): Observable<any> {
        let params = JSON.stringify(solicitud);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.post(this.URL + 'nueva-solicitud', params, { headers: headers });
    }

    obtenerSolicitudes(token, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.URL + 'obtener-solicitudes/' + page, { headers: headers });

    }

}