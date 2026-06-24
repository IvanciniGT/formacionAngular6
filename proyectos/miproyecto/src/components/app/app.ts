import { Component } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

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

  private readonly usuariosService: UsuariosService;
  readonly usuario1:Usuario;
  readonly usuario2:Usuario;
  readonly usuario3:Usuario;
  readonly usuario4:Usuario;

  constructor() {
    this.usuariosService = new UsuariosService();
    this.usuario1 = this.usuariosService.getDatosUsuario("1");
    this.usuario2 = this.usuariosService.getDatosUsuario("2");
    this.usuario3 = this.usuariosService.getDatosUsuario("3");
    this.usuario4 = this.usuariosService.getDatosUsuario("4");
  }

}
