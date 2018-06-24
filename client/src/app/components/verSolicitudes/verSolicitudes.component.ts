import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Local } from '../../models/local';
import { Solicitud } from '../../models/solicitud';
import { UsuarioService } from '../../services/usuario.service';
import { LocalService } from '../../services/local.service';
import { SolicitudService } from '../../services/solicitud.service';
import { GLOBAL } from '../../services/global';

declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'verSolicitudes',
    templateUrl: './verSolicitudes.component.html',
    providers: [UsuarioService,
        LocalService,
        SolicitudService]
})

export class verSolicitudesComponent implements OnInit {
    public title: string;
    public pagina;
    public total;
    public paginas;
    public items_por_pagina;
    public solicitudes: Solicitud[];
    public noMore;
    public identity;
    public token;
    public URL: string;
    public status: string;
    public selector: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioService: UsuarioService,
        private _localService: LocalService,
        private _solicitudService: SolicitudService
    ) {
        this.title = 'Solicitudes de Espacios';
        this.selector = 'Todas';
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
        this.URL = GLOBAL.url;
        this.pagina = 1;
        this.noMore = false;
    }

    ngOnInit() {
        console.log('Componente de Ver Solicitudes cargado correctamente');
        this.obtenerSolicitudes(this.pagina);
    }

    obtenerSolicitudes(pagina, adding = false) {
        if (this.selector != 'Todas') {
            this.solicitudes = [];
            this.selector = 'Todas'
        }

        this._solicitudService.obtenerSolicitudes(this.token, pagina).subscribe(
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

    obtenerSolicitudesPendientes(pagina, adding = false) {
        if (this.selector != 'Pendiente') {
            this.solicitudes = [];
            this.selector = 'Pendiente'
        }

        this._solicitudService.obtenerSolicitudesPendientes(this.token, pagina).subscribe(
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

    obtenerSolicitudesAprobadas(pagina, adding = false) {
        if (this.selector != 'Aprobadas') {
            this.solicitudes = [];
            this.selector = 'Pendiente'
        }
        this._solicitudService.obtenerSolicitudesAprovadas(this.token, pagina).subscribe(
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

    obtenerSolicitudesDenegadas(pagina, adding = false) {
        if (this.selector != 'Denegadas') {
            this.solicitudes = [];
            this.selector = 'Denegadas'
        }
        this._solicitudService.obtenerSolicitudesDenegadas(this.token, pagina).subscribe(
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
        this.obtenerSolicitudes(this.pagina, true);
    }

    refresh(event = null) {
        this.obtenerSolicitudes(1);
    }

}