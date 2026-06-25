// Modelo tal y como llega/viaja desde el backend (json-server).
// En este caso coincide con el modelo de la aplicación, pero lo mantenemos separado
// para poder adaptar (mapear) si el backend real tuviera otra forma.
export class MascotaBackend {
  id?: string;
  nombre?: string;
  tipo?: string;
  raza?: string;
  edad?: number;
  foto?: string;
}
