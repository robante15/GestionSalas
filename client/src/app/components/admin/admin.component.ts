import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Local } from '../../models/local';
import { Solicitud } from '../../models/solicitud';
import { UsuarioService } from '../../services/usuario.service';
import { LocalService } from '../../services/local.service';
import { SolicitudService } from '../../services/solicitud.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    providers: [UsuarioService,
        LocalService,
        SolicitudService]
})

export class AdminComponent implements OnInit {
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
    public search: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioService: UsuarioService,
        private _localService: LocalService,
        private _solicitudService: SolicitudService
    ) {
        this.title = "Administración";
        this.selector = 'Todas';
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
        this.URL = GLOBAL.url;
        this.pagina = 1;
        this.noMore = false;
    }

    ngOnInit() {
        console.log('Componente de Admin cargado Correctamente');
    }



}