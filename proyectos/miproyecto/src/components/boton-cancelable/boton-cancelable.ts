import { OutOfBandDiagnosticCategory } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton-cancelable',
  imports: [],
  templateUrl: './boton-cancelable.html',
  styleUrl: './boton-cancelable.css',
})
export class BotonCancelable {

  @Input() mensajeBoton: string = "Eliminar";
  @Input() mensajeConfirmacion: string = "Estoy seguro";
  @Input() mensajeCancelacion: string = "Cancelar";

  // Los outputs se generan con un EventEmitter, que es un objeto que permite emitir eventos hacia el exterior del componente.
  @Output() confirmado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  hanApretadoAlBotonPrincipal: boolean = false;

  toogleHanApretadoAlBotonPrincipal() {
    this.hanApretadoAlBotonPrincipal = !this.hanApretadoAlBotonPrincipal;
  }

  apretaronEnCancelar(){
    this.toogleHanApretadoAlBotonPrincipal();
    this.cancelado.emit();
  }

  apretaronEnConfirmar() {
    this.toogleHanApretadoAlBotonPrincipal();
    this.confirmado.emit();
  }

}
/*

<app-boton-cancelable 
  (confirmado)="confirmarEliminar()" 
  (cancelado)="cancelarEliminar()"
  mensajeBoton="Eliminar"
  mensajeConfirmacion="Si, quiero eliminar este registro"
  mensajeCancelacion="No, dejarme en el formulario"
></app-boton-cancelable>
*/