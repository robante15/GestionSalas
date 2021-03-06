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

    eliminarSolicitud(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.delete(this.URL + 'solicitud-delete/' + id, { headers: headers });
    }

    obtenerSolicitudes(token, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.URL + 'obtener-solicitudes/' + page, { headers: headers });
    }

    obtenerSolicitudesLocal(token, page = 1, localID): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.URL + 'obtener-solicitudes-local/' + page +'/' + localID, { headers: headers });
    }

    obtenerSolicitudesLocalAprobadas(token, page = 1, localID): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.URL + 'obtener-solicitudes-local-aprobadas/' + page +'/' + localID, { headers: headers });
    }

    obtenerSolicitudCorrelativo(token, correlativo): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.URL + 'obtener-solicitud-correlativo/' + correlativo, { headers: headers });
    }

    obtenerSolicitudesAprovadas(token, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.URL + 'obtener-solicitudes-aprovadas/' + page, { headers: headers });
    }

    obtenerSolicitudesPendientes(token, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.URL + 'obtener-solicitudes-pendientes/' + page, { headers: headers });
    }

    obtenerSolicitudesDenegadas(token, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.URL + 'obtener-solicitudes-denegadas/' + page, { headers: headers });
    }

    aprovarSolicitud(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        console.log(headers);
        return this._http.put(this.URL + 'aprobar-solicitud/' + id, null,{ headers: headers });
    }

    denegarSolicitud(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.put(this.URL + 'denegar-solicitud/' + id, null, { headers: headers });
    }

}