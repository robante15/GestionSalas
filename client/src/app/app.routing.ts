import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { nuevaSolicitudComponent } from './components/nuevaSolicitud/nuevaSolicitud.component';
import { verSolicitudesComponent } from './components/verSolicitudes/verSolicitudes.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'nuevaSolicitud', component: nuevaSolicitudComponent },
    { path: 'verSolicitudes', component: verSolicitudesComponent },
    { path: 'horarios', component: HorariosComponent },
    { path: 'admin', component: AdminComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
