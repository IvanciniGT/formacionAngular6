import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

// Modo de presentación del botón.
export type ModoBoton = 'texto' | 'icono';

// Botón para operaciones peligrosas (eliminar, salir de un formulario con cambios, etc).
// Al pulsarlo NO ejecuta la acción directamente: pide confirmación.
// Puede mostrarse como texto (vista de detalle) o como icono (items de un listado).
@Component({
  selector: 'app-boton-cancelable',
  templateUrl: './boton-cancelable.html',
  styleUrl: './boton-cancelable.css',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
})
export class BotonCancelable {

  // 'texto' muestra una etiqueta; 'icono' muestra solo un icono.
  @Input() modo: ModoBoton = 'texto';

  @Input() mensajeBoton = 'Eliminar';
  @Input() mensajeConfirmacion = 'Sí, confirmar';
  @Input() mensajeCancelacion = 'Cancelar';

  // Icono a usar en modo 'icono' (nombre de Material Icons).
  @Input() icono = 'delete';

  // Color del botón principal ('primary' | 'accent' | 'warn').
  @Input() color: 'primary' | 'accent' | 'warn' = 'warn';

  // Eventos hacia el exterior del componente.
  @Output() confirmado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  // Controla si estamos mostrando el botón principal o las opciones de confirmar/cancelar.
  pidiendoConfirmacion = false;

  pedirConfirmacion(): void {
    this.pidiendoConfirmacion = true;
  }

  confirmar(): void {
    this.pidiendoConfirmacion = false;
    this.confirmado.emit();
  }

  cancelar(): void {
    this.pidiendoConfirmacion = false;
    this.cancelado.emit();
  }
}
