import { Component, signal, WritableSignal } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

// Quiero mi propia marca HTML
// La marca se llama app-root
// Cuando se renderice por pantalla, quiero que se muestre el contenido de app.html
// Los elementos HTML que se van a usar para renderizar esta marca, se les aplicar los estilos de app.css
// Y el comportamiento de esta marca, según la clase que hay aquí abajo.
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [UsuarioComponent, AsyncPipe],
})
export class App {
  // Tiene código? NO.
  // Pues mi componente no tendrá ningún comportamiento.

  usuario1?:Usuario;
  usuario2:Usuario|undefined;
  usuario3=signal<Usuario|undefined>(undefined);
        // Los signal de Angular son una forma relativamente nueva de Angular de manejar 
        // variables que pueden cambiar de valor sin que Angular a priori se entere
        // Por ejemplo en llamadas asíncronas, como en este caso, donde hacemos una llamada al backend para obtener los datos de un usuario.
        // Con esto, simplemente le digo a Angular que la variable usuario3,por ser un signal
        // puede cambiar de valor y me ofrece una función para hacer los cambios de valor.
        // Al usar esa función, Angular es notificado de que la variable ha cambiado de valor y repinta el componente para reflejar los cambios en pantalla.
  usuario4$:Observable<Usuario>;
    // SOLEMOS POR CONVENCION llamar a las variables que contienen un observable con el signo $ al final.
    // No aporta nada funcional.

  constructor(private readonly usuariosService: UsuariosService) {
     const ticket: Observable<Usuario> = this.usuariosService.getDatosUsuario("1");
     ticket.subscribe({
      next: (usuario: Usuario) => this.usuario1 = usuario ,
      error: (error: any) => console.error("Error al obtener los datos del usuario 1", error),
    });

    this.usuariosService.getDatosUsuario("2").subscribe({
      next: (usuario: Usuario) => this.usuario2 = usuario,
      error: (error: any) => console.error("Error al obtener los datos del usuario 2", error),
    });
    this.usuariosService.getDatosUsuario("3").subscribe({
      next: (usuario: Usuario) => this.usuario3.set(usuario),
                                              // Al llamar a la función set de un signal,
                                              // Angular es notificado de que la variable ha cambiado de valor 
                                              // y repinta el componente para reflejar los cambios en pantalla.
      error: (error: any) => console.error("Error al obtener los datos del usuario 3", error),
    });
    this.usuario4$ = this.usuariosService.getDatosUsuario("4");
    // En este caso, las actualizaciones de valores son asíncronas.
    // Y Angular no es capaz de detectar que hay un cambio en el valor de usuario1, usuario2, usuario3 y usuario4.
    // Y por ende, no solicita que se repinte el componente para reflejar los cambios en pantalla.

    // Formas de resolverlo:
    // FORMA 1: Trabajar con el observable.
    // FORMA 2: Usar signals. 
    // La sintaxis del Observable es más simple, pero me ofrece menos control sobre el flujo de datos.
    // Por ejemplo, si lo que recibo no es un valor, sino un error.
  }

}

