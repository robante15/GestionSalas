import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { GLOBAL } from './services/global';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService]
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  public url: string;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = 'Sistema de Gestión de Salas';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._usuarioService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this.identity = this._usuarioService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

}
