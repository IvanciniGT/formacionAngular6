import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuariosService } from "./usuarios.service";
import { HttpClient } from "@angular/common/http";
import { delay, map, Observable } from "rxjs";
import { UsuarioBackend } from "./usuario.backend.model";

@Injectable({
    providedIn: 'root' // Esto hace que Angular cree una instancia de esta clase y la ponga a disposición de toda la aplicación. Y que esa instancia sea única. Es un Singleton.
                       // Hace que esta clase tenga comportamiento de Singleton.
})
export class UsuariosServiceImpl extends UsuariosService {

    private readonly urlBase = "http://localhost:3000/usuarios";

    constructor(private readonly httpClient: HttpClient) { // Inyección de dependencias. Le decimos a Angular que nos inyecte una instancia de HttpClient en el constructor de esta clase.
        super();
    }

    getDatosUsuario(id: string): Observable<Usuario> {
        return this.httpClient.get<UsuarioBackend>(this.urlBase+"/"+id).pipe(
            delay(3000) // Forzamos una demora de 10 segundos en la peticion para que de tiempo a ver los mensajes
        ) // Transformas los UsuarioBackend que vienen del backend en Usuario que es el modelo que usamos en la aplicación.
        .pipe(
            map((usuarioBackend: UsuarioBackend) => this.mapper(usuarioBackend))
        );

    }

    getDatosDeTodosLosUsuarios(): Observable<Usuario[]>{
        // Vamos a forzar una demora de 10 segundos en la peticion para que de tiempo a ver los mensajes
        return this.httpClient.get<UsuarioBackend[]>(this.urlBase).pipe(
            delay(3000) // Forzamos una demora de 10 segundos en la peticion para que de tiempo a ver los mensajes
        ).pipe(
            map((usuariosBackend: UsuarioBackend[]) => usuariosBackend.map(usuarioBackend => this.mapper(usuarioBackend)))
        );
    }

    mapper(usuarioBackend: UsuarioBackend): Usuario {
        const usuario: Usuario = {
            id: usuarioBackend.id,
            nombre: usuarioBackend.nombre,
            apellidos: usuarioBackend.apellidos,
            foto: usuarioBackend.foto,
            email: usuarioBackend.email,
            edad: usuarioBackend.fachaNacimiento ? new Date().getFullYear() - new Date(usuarioBackend.fachaNacimiento).getFullYear() : undefined
        };
        return usuario;
    }

}


// JSON = JS Object Notation