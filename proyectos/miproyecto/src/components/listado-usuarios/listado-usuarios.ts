import { Component, signal } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.html',
  styleUrl: './listado-usuarios.css',
  imports: [UsuarioComponent],
})
export class ListadoUsuariosComponent {

  listadoUsuarios=signal<Usuario[]|undefined>(undefined);
  errorAlCargarLosDatosDeLosUsuarios=signal<boolean>(false);

  constructor(private readonly usuariosService: UsuariosService) {
      this.usuariosService.getDatosDeTodosLosUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        console.log("Datos de todos los usuarios obtenidos correctamente", usuarios);
        this.listadoUsuarios.set(usuarios)
      },
      error: (error: any) => {
        console.error("Error al obtener los datos de todos los usuarios", error);
        this.errorAlCargarLosDatosDeLosUsuarios.set(true);
      },
    });
  }

}

