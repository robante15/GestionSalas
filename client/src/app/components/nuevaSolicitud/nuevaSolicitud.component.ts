import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Local } from '../../models/local';
import { Solicitud } from '../../models/solicitud';
import { UsuarioService } from '../../services/usuario.service';
import { LocalService } from '../../services/local.service';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
    selector: 'nuevaSolicitud',
    templateUrl: './nuevaSolicitud.component.html',
    providers: [UsuarioService,
        LocalService,
        SolicitudService]
})

export class nuevaSolicitudComponent implements OnInit {
    public title: string;
    public user: Usuario;
    public btn_solicitud: string;
    public status: string;
    public token;
    public identity;
    public locales: Local[];
    public listaLocales;
    public solicitudOBJ: Solicitud;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioService: UsuarioService,
        private _localService: LocalService,
        private _solicitudService: SolicitudService
    ) {
        this.identity = this._usuarioService.getIdentity();
        this.status = 'nada';
        this.btn_solicitud = 'Enviar Solicitud'
        this.title = 'Crear una nueva Solicitud';
        this.user = new Usuario("", "", "", "", "", "", "", "", "");
        this.solicitudOBJ = new Solicitud("", "", "", "", "", "", "", "", "", "", "", "false", this.identity._id);
        this.token = this._usuarioService.getToken();
    }

    ngOnInit() {
        this.identity = this._usuarioService.getIdentity();
        this.obtenerLocales(1);
        console.log('Se ha inicializado el componente NuevaSolicitud');
    }

    obtenerLocales(page) {
        this._localService.obtenerLocales(this.token, page).subscribe(
            response => {
                this.listaLocales = response.locales;
                console.log(this.listaLocales);
            }, error => {
                console.log(<any>error);
            }
        );
    }

    onSubmit(form) {
        console.log(this.solicitudOBJ);
        this._solicitudService.nuevaSolicitud(this.token, this.solicitudOBJ).subscribe(
            response => {
                if (response.solicitud && response.solicitud._id) {
                    this.status = 'Correcto';
                    form.reset();
                } else {
                    console.log(response);
                    this.status = JSON.stringify(response);
                }
            }, error => {
                console.log(<any>error);
            }

        );
    }
}
