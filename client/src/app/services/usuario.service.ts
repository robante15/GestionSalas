import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global';

@Injectable()

export class UsuarioService {
    public url: string;
    public token;
    public identity;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    registro(usuarioNuevo: Usuario): Observable<any> {
        let params = JSON.stringify(usuarioNuevo);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'registrar', params, { headers: headers });
    }

    inicioSesion(usuario, gettoken = null): Observable<any> {

        if (gettoken != null) {
            usuario.gettoken = gettoken;
        }

        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'inicioSesion', params, { headers: headers });
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = JSON.parse(localStorage.getItem('token'));

        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

}