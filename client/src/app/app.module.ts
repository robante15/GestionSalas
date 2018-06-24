import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { MomentModule } from 'angular2-moment';

//Cargar componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { nuevaSolicitudComponent } from './components/nuevaSolicitud/nuevaSolicitud.component'
import { verSolicitudesComponent } from './components/verSolicitudes/verSolicitudes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    nuevaSolicitudComponent,
    verSolicitudesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    DlDateTimePickerDateModule,
    MomentModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
