import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { Mascota, TipoMascota } from '../../models/mascota.model';
import { FiltroMascotas, MascotasService } from './mascotas.service';
import { MascotaBackend } from './mascota.backend.model';

@Injectable({
  // Singleton a nivel de aplicación.
  providedIn: 'root',
})
export class MascotasServiceImpl extends MascotasService {

  private readonly urlBase = 'http://localhost:3000/mascotas';

  // Demora artificial para poder ver los mensajes de carga / éxito / error en la UI.
  // (json-server v1 eliminó la opción --delay, así que la metemos aquí.)
  private readonly DEMORA_MS = 10;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  listar(filtro?: FiltroMascotas): Observable<Mascota[]> {
    // Construimos los query params usando la sintaxis de json-server v1: campo:operador=valor.
    // - nombre:contains -> coincidencia parcial (case-insensitive).
    // - tipo -> coincidencia exacta (sin operador = eq).
    let params = new HttpParams();
    if (filtro?.nombre) {
      params = params.set('nombre:contains', filtro.nombre);
    }
    if (filtro?.tipo) {
      params = params.set('tipo', filtro.tipo);
    }

    return this.httpClient.get<MascotaBackend[]>(this.urlBase, { params }).pipe(
      delay(this.DEMORA_MS),
      map((mascotas) => mascotas.map((m) => this.mapper(m))),
    );
  }

  obtener(id: string): Observable<Mascota> {
    return this.httpClient.get<MascotaBackend>(`${this.urlBase}/${id}`).pipe(
      delay(this.DEMORA_MS),
      map((m) => this.mapper(m)),
    );
  }

  crear(mascota: Mascota): Observable<Mascota> {
    // No enviamos id: lo genera el backend.
    const { id, ...datos } = mascota;
    return this.httpClient.post<MascotaBackend>(this.urlBase, datos).pipe(
      delay(this.DEMORA_MS),
      map((m) => this.mapper(m)),
    );
  }

  actualizar(id: string, mascota: Mascota): Observable<Mascota> {
    return this.httpClient.put<MascotaBackend>(`${this.urlBase}/${id}`, mascota).pipe(
      delay(this.DEMORA_MS),
      map((m) => this.mapper(m)),
    );
  }

  eliminar(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlBase}/${id}`).pipe(
      delay(this.DEMORA_MS),
    );
  }

  // Transforma el modelo del backend en el modelo de la aplicación.
  private mapper(mascotaBackend: MascotaBackend): Mascota {
    return {
      id: mascotaBackend.id,
      nombre: mascotaBackend.nombre ?? '',
      tipo: (mascotaBackend.tipo as TipoMascota) ?? 'perro',
      raza: mascotaBackend.raza ?? '',
      edad: mascotaBackend.edad ?? 0,
      foto: mascotaBackend.foto ?? '',
    };
  }
}
