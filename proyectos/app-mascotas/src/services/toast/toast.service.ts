import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Servicio sencillo para mostrar avisos (toasts) reutilizando el MatSnackBar de Angular Material.
// Centraliza la configuración para que los componentes solo digan "muestra éxito/error/info".
@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private readonly snackBar: MatSnackBar) {}

  exito(mensaje: string): void {
    this.mostrar(mensaje, 'toast-exito');
  }

  error(mensaje: string): void {
    this.mostrar(mensaje, 'toast-error');
  }

  info(mensaje: string): void {
    this.mostrar(mensaje, 'toast-info');
  }

  private mostrar(mensaje: string, clase: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [clase],
    });
  }
}
