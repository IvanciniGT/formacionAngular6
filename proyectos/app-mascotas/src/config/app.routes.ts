import { Routes } from '@angular/router';
import { ListadoDeMascotasComponent } from '../components/listado-mascotas/listado-mascotas';
import { FormularioDeMascotaComponent } from '../components/formulario-mascota/formulario-mascota';
import { DetalleDeMascotaComponent } from '../components/detalle-mascota/detalle-mascota';
import { NoEncontradoComponent } from '../components/no-encontrado/no-encontrado';

export const routes: Routes = [
  // Ruta por defecto: redirige al listado.
  { path: '', redirectTo: 'listado-mascotas', pathMatch: 'full' },

  { path: 'listado-mascotas', component: ListadoDeMascotasComponent },

  // Alta y edición reutilizan el mismo componente.
  { path: 'nueva-mascota', component: FormularioDeMascotaComponent },
  { path: 'editar-mascota/:id', component: FormularioDeMascotaComponent },

  { path: 'detalle-mascota/:id', component: DetalleDeMascotaComponent },

  // Ruta comodín (404): cualquier ruta no reconocida.
  { path: '**', component: NoEncontradoComponent },
];
