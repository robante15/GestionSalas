import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

    public title: string;
    user: Usuario;
    status: string;
    btn_login: string;
    identity;
    token: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioService: UsuarioService
    ) {
        this.status = 'nada';
        this.title = 'Inicio de Sesión';
        this.btn_login = 'Iniciar Sesión';
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
        console.log('Componente de Login Cargado');
    }

    onSubmit(form) {
        //Logear al usuario y conseguir sus datos
        this._usuarioService.inicioSesion(this.user).subscribe(
            response => {
                console.log(response);
                this.identity = response.Usuario;
                if (!this.identity || !this.identity._id) {
                    this.status = JSON.stringify(response);
                } else {
                    this.status = "Correcto";
                    //Persistir datos del usuario
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    //Conseguir el tokken
                    this.gettoken();
                }

            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'Error al iniciar la sesion';
                }
            }
        );
        console.log(this.user);
        //form.reset();
    }

    gettoken() {
        //Logear al usuario y conseguir sus datos
        this._usuarioService.inicioSesion(this.user, 'true').subscribe(
            response => {

                this.token = response.token;

                if (this.token.length <= 0) {
                    this.status = "Error";
                } else {
                    //Persistir token del usuario
                    localStorage.setItem('token', JSON.stringify(this.token));
                }

            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'Error al iniciar la sesion';
                }
            }
        );
    }

}