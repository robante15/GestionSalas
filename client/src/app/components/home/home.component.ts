import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [UsuarioService]
})

export class HomeComponent implements OnInit {
    public title: string;
    public user: Usuario;
    public identity;

    constructor(
        private _userService: UsuarioService,
    ) {
        this.title = "Sistema de Gestión de Salas UES-FMO";
        this.user = null;
    }

    ngOnInit() {
        //console.log('home.component ha sido cargado')
        this.ComproveIdentity();
    }

    ComproveIdentity(){
        if(this._userService.getIdentity){
            //console.log("Hay un usuario logeado")
            this.user = this._userService.getIdentity();
        } else {
            console.log("No hay ningun usuario logeado");
        }
    }

}