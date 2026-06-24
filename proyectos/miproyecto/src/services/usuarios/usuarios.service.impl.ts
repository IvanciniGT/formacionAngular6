import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuariosService } from "./usuarios.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
        return this.httpClient.get<Usuario>(this.urlBase+"/"+id); // Hacemos la llamada al backend y le decimos que nos devuelva un objeto de tipo Usuario.
    }

}


// JSON = JS Object Notation