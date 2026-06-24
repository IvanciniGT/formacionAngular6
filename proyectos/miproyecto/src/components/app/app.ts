import { Component } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario';
import { Usuario } from '../../models/usuario.model';

// Quiero mi propia marca HTML
// La marca se llama app-root
// Cuando se renderice por pantalla, quiero que se muestre el contenido de app.html
// Los elementos HTML que se van a usar para renderizar esta marca, se les aplicar los estilos de app.css
// Y el comportamiento de esta marca, según la clase que hay aquí abajo.
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [UsuarioComponent]
})
export class App {
  // Tiene código? NO.
  // Pues mi componente no tendrá ningún comportamiento.

  readonly usuario1:Usuario = {
      id: '1',
      nombre: 'Juanito',
      apellidos: 'Pérez',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1ITs_hgsdCzhKoOZ6eIDl9x--VqbbSHqgwAyA8T2NA&s=10',
      email: 'juanito@perez.com'
  }
  readonly usuario2:Usuario = {
      id: '2',
      nombre: 'Pepita',
      apellidos: 'Pérez',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1ITs_hgsdCzhKoOZ6eIDl9x--VqbbSHqgwAyA8T2NA&s=10',
      email: 'juanito@perez.com'
  }
  readonly usuario3:Usuario = {
      id: '3',
      nombre: 'Menchu',
      apellidos: 'Pérez',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1ITs_hgsdCzhKoOZ6eIDl9x--VqbbSHqgwAyA8T2NA&s=10',
      email: 'juanito@perez.com'
  }
  readonly usuario4:Usuario = {
      id: '4',
      nombre: 'Federico',
      apellidos: 'Pérez',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1ITs_hgsdCzhKoOZ6eIDl9x--VqbbSHqgwAyA8T2NA&s=10',
      email: 'juanito@perez.com'
  }

}
