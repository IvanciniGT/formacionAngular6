import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FiltroMascotas } from '../../services/mascotas/mascotas.service';
import { TIPOS_MASCOTA, TipoMascota } from '../../models/mascota.model';

// Buscador de mascotas por nombre y tipo.
// No busca por sí mismo: emite los filtros hacia el componente padre (el listado),
// que es quien llama al servicio (búsqueda en backend).
@Component({
  selector: 'app-mascotas-buscador',
  templateUrl: './mascotas-buscador.html',
  styleUrl: './mascotas-buscador.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class MascotasBuscadorComponent {

  // Tipos disponibles para el desplegable.
  readonly tipos = TIPOS_MASCOTA;

  // Emitimos los filtros al padre.
  @Output() buscar = new EventEmitter<FiltroMascotas>();

  formulario: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: [''],
      tipo: [''],
    });
  }

  aplicarFiltros(): void {
    const { nombre, tipo } = this.formulario.value;
    const filtro: FiltroMascotas = {};
    if (nombre?.trim()) {
      filtro.nombre = nombre.trim();
    }
    if (tipo) {
      filtro.tipo = tipo as TipoMascota;
    }
    this.buscar.emit(filtro);
  }

  limpiar(): void {
    this.formulario.reset({ nombre: '', tipo: '' });
    this.buscar.emit({});
  }
}
