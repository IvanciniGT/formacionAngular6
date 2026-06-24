import { Observable } from "rxjs";
import { Usuario } from "../../models/usuario.model";

export abstract class UsuariosService {
    abstract getDatosUsuario(id: string): Observable<Usuario>;
    abstract getDatosDeTodosLosUsuarios(): Observable<Usuario[]>;
}
// Es el equivalente a una interfaz
