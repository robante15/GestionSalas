import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UsuarioService]
})

export class RegisterComponent implements OnInit {
    title: string;
    user: Usuario;
    btn_registro: string;
    status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioService: UsuarioService
    ) {
        this.status = 'nada';
        this.btn_registro = 'Registrarse'
        this.title = 'Nuevo Registro';
        this.user = new Usuario("",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "");
    }

    ngOnInit() {
        console.log('Correcto: Componente del registro cargado');
    }

    onSubmit(form) {
        this._usuarioService.registro(this.user).subscribe(
            response => {
                if (response.usuario && response.usuario._id) {
                    this.status = 'Correcto';
                    form.reset();
                } else {
                    console.log(response);
                    this.status = JSON.stringify(response);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
