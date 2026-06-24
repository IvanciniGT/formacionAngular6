import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
//import { NgClass } from '@angular/common';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
 // imports: [NgClass],
  standalone: true
})
// standalone: Puedo usar este componente en cualquier sitio.
// Si no fuera standalone, el componente solo podría ser usado en el módulo donde se declara.
export class UsuarioComponent {

  // Con la marca Input, decimos que ese dato nos lo pueden pasar como un atributo html al usar la marca.
  // Con required: true, decimos que ese atributo es obligatorio. Si no se pasa, el compilador nos dará un error.
  // La marca !, decimos que ese atributo no puede ser null ni undefined. Si lo es, el compilador nos dará un error.
  @Input({required: true}) usuario! : Usuario;
  @Input() mode: "compact" | "extended" = "compact"; // En JAVA lo resolveríamos con un Enumerado
  @Input() extensible: boolean = true;

  constructor() {
  }

}
// TS y JS son lenguajes DuckTyping. Los tipos de datos son DuckTyping.
// Si parece un pato, nada como un pato y grazna como un pato, entonces es un pato.

// Al transpilar este archivo a JS, se elimina la definición de TIPOS.
// JS No tiene tipos

// Pero... en ese proceso, los valido! que es lo que interesa de la definición de tipos.. el poder validar!