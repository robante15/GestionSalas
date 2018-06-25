import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { LocalService } from '../../services/local.service';
import { Usuario } from '../../models/usuario';
import { Local } from '../../models/local';
import { Solicitud } from '../../models/solicitud';
import { UsuarioService } from '../../services/usuario.service';

declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'horarios',
    templateUrl: './horarios.component.html',
    providers: [UsuarioService,
        LocalService,
        SolicitudService]
})
export class HorariosComponent implements OnInit {
    public title: string;
    public user: Usuario;
    public btn_solicitud: string;
    public status: string;
    public token;
    public noMore;
    public identity;
    public locales: Local[];
    public listaLocales;
    public solicitudOBJ: Solicitud;
    public pagina;
    public total;
    public paginas;
    public items_por_pagina;
    public solicitudes: Solicitud[];
    public localID: string;
    public selector: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _localService: LocalService,
        private _solicitudService: SolicitudService,
        private _usuarioService: UsuarioService
    ) {
        this.solicitudes = [];
        this.identity = this._usuarioService.getIdentity();
        this.title = 'Horarios';
        this.user = new Usuario("", "", "", "", "", "", "", "", "");
        this.solicitudOBJ = new Solicitud("", "", "", "", "", "", "", "", "", "", "", "false", this.identity._id);
        this.token = this._usuarioService.getToken();
        this.noMore = false;
    }
    ngOnInit() {
        this.identity = this._usuarioService.getIdentity();
        console.log('Componente de Horarios Cargado');
        this.obtenerLocales();
    }

    obtenerLocales() {
        this._localService.obtenerLocales(this.token).subscribe(
            response => {
                this.listaLocales = response.locales;
                console.log(this.listaLocales);
            }, error => {
                console.log(<any>error);
            }
        );
    }

    obtenerSolicitudesLocal(pagina, adding = false, localID) {

        if (this.selector != this.localID) {
            this.solicitudes = [];
            this.selector = this.localID;
        }

        this._solicitudService.obtenerSolicitudesLocal(this.token, pagina, this.localID).subscribe(
            response => {
                if (response.solicitudes) {
                    this.total = response.total_items;
                    this.paginas = response.paginas;
                    this.items_por_pagina = response.items_por_pagina;
                    if (!adding) {
                        this.solicitudes = response.solicitudes;
                    } else {
                        var arrayA = this.solicitudes;
                        var arrayB = response.solicitudes;
                        this.solicitudes = arrayA.concat(arrayB);

                        $("html, body").animate({ scrollTop: $('body').prop("scrollHeight") }, 500);

                    }

                    if (pagina > this.paginas) {
                        this._router.navigate(['/verSolicitudes']);
                    }
                } else {
                    this.status = 'Error';
                }
            }, error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'Error';
                }
            }
        );
    }

    obtenerSolicitudesLocalAprobadas(pagina, adding = false, localID) {

        if (this.selector != this.localID) {
            this.solicitudes = [];
            this.selector = this.localID;
        }

        this._solicitudService.obtenerSolicitudesLocalAprobadas(this.token, pagina, this.localID).subscribe(
            response => {
                if (response.solicitudes) {
                    this.total = response.total_items;
                    this.paginas = response.paginas;
                    this.items_por_pagina = response.items_por_pagina;
                    if (!adding) {
                        this.solicitudes = response.solicitudes;
                    } else {
                        var arrayA = this.solicitudes;
                        var arrayB = response.solicitudes;
                        this.solicitudes = arrayA.concat(arrayB);

                        $("html, body").animate({ scrollTop: $('body').prop("scrollHeight") }, 500);

                    }

                    if (pagina > this.paginas) {
                        this._router.navigate(['/verSolicitudes']);
                    }
                } else {
                    this.status = 'Error';
                }
            }, error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'Error';
                }
            }
        );
    }

    viewMore() {
        this.pagina += 1;
        if (this.pagina == this.paginas) {
            this.noMore = true;
        }
        this.obtenerSolicitudesLocal(this.pagina, true, this.localID);
    }

    refresh(event = null) {
        this.obtenerSolicitudesLocal(1, true, this.localID);
    }
}
