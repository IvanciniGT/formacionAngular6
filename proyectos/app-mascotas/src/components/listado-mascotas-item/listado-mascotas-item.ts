import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Mascota } from '../../models/mascota.model';
import { BotonCancelable } from '../boton-cancelable/boton-cancelable';

// Muestra una mascota individual dentro del listado.
// Solo enseñamos nombre, tipo y raza, un enlace al detalle y un botón para eliminar (modo icono).
@Component({
  selector: 'app-listado-mascotas-item',
  templateUrl: './listado-mascotas-item.html',
  styleUrl: './listado-mascotas-item.css',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, BotonCancelable],
})
export class ListadoDeMascotasItemComponent {

  @Input({ required: true }) mascota!: Mascota;

  // Avisamos al padre (el listado) de que se quiere eliminar esta mascota.
  @Output() eliminar = new EventEmitter<Mascota>();

  solicitarEliminar(): void {
    this.eliminar.emit(this.mascota);
  }
}
