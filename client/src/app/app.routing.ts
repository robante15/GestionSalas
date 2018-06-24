import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { nuevaSolicitudComponent } from './components/nuevaSolicitud/nuevaSolicitud.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'home', component: HomeComponent},
    { path: 'nuevaSolicitud', component: nuevaSolicitudComponent}
];

export const appRoutingProviders:any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
