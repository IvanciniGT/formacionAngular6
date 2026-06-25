import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Mascota, TIPOS_MASCOTA } from '../../models/mascota.model';
import { EstadoCarga } from '../../models/estado-carga.model';
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { ToastService } from '../../services/toast/toast.service';
import { BotonCancelable } from '../boton-cancelable/boton-cancelable';

// Validación de URL básica para el campo foto.
const PATRON_URL = 'https?://.+';

// Formulario reactivo para dar de alta y modificar mascotas.
// Si recibe un :id por la ruta trabaja en modo edición; si no, en modo alta.
@Component({
  selector: 'app-formulario-mascota',
  templateUrl: './formulario-mascota.html',
  styleUrl: './formulario-mascota.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BotonCancelable,
  ],
})
export class FormularioDeMascotaComponent {

  readonly tipos = TIPOS_MASCOTA;

  formulario: FormGroup;

  // Id de la mascota en edición (undefined en modo alta).
  private id?: string;

  // Estado de la operación de guardado / carga inicial.
  estado = signal<EstadoCarga>('idle');

  constructor(
    private readonly fb: FormBuilder,
    private readonly ruta: ActivatedRoute,
    private readonly router: Router,
    private readonly mascotasService: MascotasService,
    private readonly toast: ToastService,
  ) {
    this.formulario = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      tipo: [null, [Validators.required]],
      raza: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      edad: [null, [Validators.required, Validators.min(0), Validators.max(30)]],
      foto: [null, [Validators.required, Validators.pattern(PATRON_URL)]],
    });

    // ¿Estamos editando? Si hay id en la ruta, cargamos la mascota.
    this.id = this.ruta.snapshot.paramMap.get('id') ?? undefined;
    if (this.id) {
      this.cargarMascota(this.id);
    }
  }

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  private cargarMascota(id: string): void {
    this.estado.set('loading');
    this.mascotasService.obtener(id).subscribe({
      next: (mascota) => {
        this.formulario.patchValue(mascota);
        this.estado.set('idle');
      },
      error: (error) => {
        console.error('Error al cargar la mascota a editar', error);
        this.estado.set('error');
        this.toast.error('No se pudo cargar la mascota a editar');
      },
    });
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.toast.error('Revisa los campos del formulario');
      return;
    }

    const mascota: Mascota = this.formulario.value;
    this.estado.set('loading');
    this.toast.info(this.esEdicion ? 'Guardando cambios...' : 'Creando mascota...');

    const peticion = this.esEdicion
      ? this.mascotasService.actualizar(this.id!, mascota)
      : this.mascotasService.crear(mascota);

    peticion.subscribe({
      next: () => {
        this.estado.set('success');
        this.toast.exito(this.esEdicion ? 'Mascota actualizada' : 'Mascota creada');
        this.router.navigate(['/listado-mascotas']);
      },
      error: (error) => {
        console.error('Error al guardar la mascota', error);
        this.estado.set('error');
        this.toast.error('No se pudo guardar la mascota');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/listado-mascotas']);
  }

  // Helper para la plantilla: ¿debe mostrarse el error de un campo?
  mostrarError(campo: string, error: string): boolean {
    const control = this.formulario.get(campo);
    return !!control && control.touched && control.hasError(error);
  }
}
