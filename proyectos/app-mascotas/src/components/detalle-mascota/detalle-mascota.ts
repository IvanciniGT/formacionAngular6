import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Mascota } from '../../models/mascota.model';
import { EstadoCarga } from '../../models/estado-carga.model';
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { ToastService } from '../../services/toast/toast.service';
import { BotonCancelable } from '../boton-cancelable/boton-cancelable';

// Muestra toda la información de una mascota y permite editarla o eliminarla.
@Component({
  selector: 'app-detalle-mascota',
  templateUrl: './detalle-mascota.html',
  styleUrl: './detalle-mascota.css',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BotonCancelable,
  ],
})
export class DetalleDeMascotaComponent {

  estado = signal<EstadoCarga>('idle');
  mascota = signal<Mascota | undefined>(undefined);

  constructor(
    private readonly ruta: ActivatedRoute,
    private readonly router: Router,
    private readonly mascotasService: MascotasService,
    private readonly toast: ToastService,
  ) {
    const id = this.ruta.snapshot.paramMap.get('id');
    if (id) {
      this.cargar(id);
    } else {
      this.estado.set('error');
    }
  }

  private cargar(id: string): void {
    this.estado.set('loading');
    this.mascotasService.obtener(id).subscribe({
      next: (mascota) => {
        this.mascota.set(mascota);
        this.estado.set('success');
      },
      error: (error) => {
        console.error('Error al obtener la mascota', error);
        this.estado.set('error');
        this.toast.error('No se pudo cargar la mascota');
      },
    });
  }

  eliminar(): void {
    const mascota = this.mascota();
    if (!mascota?.id) {
      return;
    }
    this.toast.info('Eliminando mascota...');
    this.mascotasService.eliminar(mascota.id).subscribe({
      next: () => {
        this.toast.exito(`"${mascota.nombre}" eliminada correctamente`);
        this.router.navigate(['/listado-mascotas']);
      },
      error: (error) => {
        console.error('Error al eliminar la mascota', error);
        this.toast.error('No se pudo eliminar la mascota');
      },
    });
  }
}
