import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario';
//import { UserService } from '../../services/usuario.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
    public title:string;
    public usuario:Usuario;
    public btn_registro:string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Registro de Nuevo Usuario';
        this.usuario = new Usuario("","","","","","","","","");
        this.btn_registro = 'Agregar usuario';
    }

    ngOnInit(){
        console.log('Componente de Registro Cargado');
    }

    onSubmit(form){
        console.log(this.usuario);
    }
}