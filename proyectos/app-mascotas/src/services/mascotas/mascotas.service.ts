import { Observable } from 'rxjs';
import { Mascota, TipoMascota } from '../../models/mascota.model';

// Filtros de búsqueda que aceptará el listado.
export interface FiltroMascotas {
  nombre?: string;
  tipo?: TipoMascota;
}

// Contrato del servicio de mascotas (equivale a una interfaz).
// Los componentes dependen de esta clase abstracta, no de la implementación concreta.
// Así podemos cambiar la implementación (json-server -> backend real) sin tocar los componentes.
export abstract class MascotasService {
  abstract listar(filtro?: FiltroMascotas): Observable<Mascota[]>;
  abstract obtener(id: string): Observable<Mascota>;
  abstract crear(mascota: Mascota): Observable<Mascota>;
  abstract actualizar(id: string, mascota: Mascota): Observable<Mascota>;
  abstract eliminar(id: string): Observable<void>;
}
