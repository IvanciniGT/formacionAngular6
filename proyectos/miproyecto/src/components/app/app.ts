import { Component } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario';

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
}
