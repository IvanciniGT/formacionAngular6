import { Routes } from '@angular/router';
import { App } from '../components/app/app';
import { ListadoUsuariosComponent } from '../components/listado-usuarios/listado-usuarios';
import { FormularioNuevoUsuarioComponent } from '../components/formulario-usuario/formulario-usuario';

export const routes: Routes = [
    {
        path: 'listado-usuarios',
        component: ListadoUsuariosComponent,
    },
    {
        path: 'nuevo-usuario',
        component: FormularioNuevoUsuarioComponent
    }
];
