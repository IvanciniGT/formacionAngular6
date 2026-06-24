import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuariosService } from "./usuarios.service";
import { HttpClient } from "@angular/common/http";
import { delay, Observable } from "rxjs";

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
        return this.httpClient.get<Usuario>(this.urlBase+"/"+id).pipe(
            delay(3000) // Forzamos una demora de 10 segundos en la peticion para que de tiempo a ver los mensajes
        );  
    }

    getDatosDeTodosLosUsuarios(): Observable<Usuario[]>{
        // Vamos a forzar una demora de 10 segundos en la peticion para que de tiempo a ver los mensajes
        return this.httpClient.get<Usuario[]>(this.urlBase).pipe(
            delay(3000) // Forzamos una demora de 10 segundos en la peticion para que de tiempo a ver los mensajes
        );
    }

}


// JSON = JS Object Notation