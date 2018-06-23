import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

    public title:string;
    
    constructor(){
        this.title = 'Registro de nuevo Usuario';
    }

    ngOnInit(){
        console.log('Componente de Registro Cargado');
    }
}