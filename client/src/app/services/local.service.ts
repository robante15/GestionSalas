import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global';

@Injectable()

export class LocalService {
    public URL: string;
    public token;
    public identity;

    constructor(public _http: HttpClient) {
        this.URL = GLOBAL.url;
    }

    obtenerLocales(token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.URL + 'obtener-todos-locales-sinpag/', { headers: headers });

    }

    obtenerLocalesPaginados(token, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.URL + 'obtener-todos-locales/' + page, { headers: headers });

    }

}