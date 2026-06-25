// Lista cerrada de tipos de mascota admitidos.
export const TIPOS_MASCOTA = ['perro', 'gato', 'conejo', 'hamster', 'loro'] as const;

// El tipo TipoMascota se deriva de la lista anterior: solo admite esos valores.
export type TipoMascota = (typeof TIPOS_MASCOTA)[number];

// Modelo que usamos dentro de la aplicación para representar una mascota.
export class Mascota {
  id?: string;            // Lo asigna el backend al dar de alta.
  nombre: string = '';    // Obligatorio.
  tipo: TipoMascota = 'perro'; // Obligatorio (lista cerrada).
  raza: string = '';      // Obligatorio (campo abierto).
  edad: number = 0;       // Obligatorio (0-30).
  foto: string = '';      // Obligatorio (url).
}
