import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
  standalone: true
})
// standalone: Puedo usar este componente en cualquier sitio.
// Si no fuera standalone, el componente solo podría ser usado en el módulo donde se declara.
export class UsuarioComponent {

  readonly usuario : Usuario = {
      id: '1',
      nombre: 'Juanito',
      apellidos: 'Pérez',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1ITs_hgsdCzhKoOZ6eIDl9x--VqbbSHqgwAyA8T2NA&s=10',
      email: 'juanito@perez.com'
  }

  constructor() {
  }

}
// TS y JS son lenguajes DuckTyping. Los tipos de datos son DuckTyping.
// Si parece un pato, nada como un pato y grazna como un pato, entonces es un pato.

// Al transpilar este archivo a JS, se elimina la definición de TIPOS.
// JS No tiene tipos

// Pero... en ese proceso, los valido! que es lo que interesa de la definición de tipos.. el poder validar!