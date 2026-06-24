import { Usuario } from "../../models/usuario.model";

export class UsuariosService {

    getDatosUsuario(id: string): Usuario {
        // Y Aquí es donde hacemos la comunicación con el backend.
        // Para hacer esa comunicación con el backend, Angular tiene su propio MODULO que se llama HTTPCLIENT.
        // Y con ese módulo, hacemos la comunicación con el backend.
        return {
            "id": "2",
            "nombre": "Pepita",
            "apellidos": "García",
            "foto": "https://fotografias.antena3.com/clipping/cmsimages01/2025/10/30/E5EAB9E0-AE86-4DA6-AF80-75844B5E0769/pepita_104.jpg?crop=1080,1080,x420,y0&width=1200&height=1200&optimize=low&format=webply",
            "email": "pepita@garcia.com"
        } // JSON
    }

}


// JSON = JS Object Notation