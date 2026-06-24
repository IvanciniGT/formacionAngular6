import { Component } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Observable } from 'rxjs';

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

  usuario1?:Usuario;
  usuario2?:Usuario;
  usuario3?:Usuario;
  usuario4:Usuario|undefined;

  constructor(private readonly usuariosService: UsuariosService) {
     const ticket: Observable<Usuario> = this.usuariosService.getDatosUsuario("1");
     ticket.subscribe({
      next: (usuario: Usuario) => this.usuario1 = usuario,
      error: (error: any) => console.error("Error al obtener los datos del usuario 1", error),
    });

    this.usuariosService.getDatosUsuario("2").subscribe({
      next: (usuario: Usuario) => this.usuario2 = usuario,
      error: (error: any) => console.error("Error al obtener los datos del usuario 2", error),
    });
    this.usuariosService.getDatosUsuario("3").subscribe({
      next: (usuario: Usuario) => this.usuario3 = usuario,
      error: (error: any) => console.error("Error al obtener los datos del usuario 3", error),
    });
    this.usuariosService.getDatosUsuario("4").subscribe({
      next: (usuario: Usuario) => this.usuario4 = usuario,
      error: (error: any) => console.error("Error al obtener los datos del usuario 4", error),
    });
  }

}

