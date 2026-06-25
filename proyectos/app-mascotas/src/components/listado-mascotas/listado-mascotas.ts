import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Mascota } from '../../models/mascota.model';
import { EstadoCarga } from '../../models/estado-carga.model';
import { FiltroMascotas, MascotasService } from '../../services/mascotas/mascotas.service';
import { ToastService } from '../../services/toast/toast.service';
import { MascotasBuscadorComponent } from '../mascotas-buscador/mascotas-buscador';
import { ListadoDeMascotasItemComponent } from '../listado-mascotas-item/listado-mascotas-item';

// Lista las mascotas (con búsqueda en backend) y permite eliminarlas.
@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.html',
  styleUrl: './listado-mascotas.css',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MascotasBuscadorComponent,
    ListadoDeMascotasItemComponent,
  ],
})
export class ListadoDeMascotasComponent {

  // Estado de la carga del listado.
  estado = signal<EstadoCarga>('idle');
  mascotas = signal<Mascota[]>([]);

  // Guardamos el último filtro aplicado para poder recargar tras eliminar.
  private filtroActual: FiltroMascotas = {};

  constructor(
    private readonly mascotasService: MascotasService,
    private readonly toast: ToastService,
  ) {
    this.cargar();
  }

  // Se dispara cuando el buscador emite nuevos filtros.
  onBuscar(filtro: FiltroMascotas): void {
    this.filtroActual = filtro;
    this.cargar();
  }

  cargar(): void {
    this.estado.set('loading');
    this.mascotasService.listar(this.filtroActual).subscribe({
      next: (mascotas) => {
        this.mascotas.set(mascotas);
        this.estado.set('success');
      },
      error: (error) => {
        console.error('Error al listar mascotas', error);
        this.estado.set('error');
        this.toast.error('No se pudieron cargar las mascotas');
      },
    });
  }

  onEliminar(mascota: Mascota): void {
    if (!mascota.id) {
      return;
    }
    this.toast.info('Eliminando mascota...');
    this.mascotasService.eliminar(mascota.id).subscribe({
      next: () => {
        this.toast.exito(`"${mascota.nombre}" eliminada correctamente`);
        this.cargar();
      },
      error: (error) => {
        console.error('Error al eliminar la mascota', error);
        this.toast.error('No se pudo eliminar la mascota');
      },
    });
  }
}
