# App Mascotas

Aplicación Angular para gestionar mascotas (alta, baja, modificación y listado con búsqueda),
construida siguiendo los patrones del proyecto `miproyecto` y usando **Angular Material**.

## Funcionalidad

- Listado de mascotas con buscador por **nombre** (parcial) y **tipo** (búsqueda en el backend).
- Alta y edición mediante un **formulario reactivo** (mismo componente para ambos casos).
- Detalle completo de una mascota.
- Eliminación con confirmación (componente `BotonCancelable` en modo texto o icono).
- Avisos al usuario (cargando / éxito / error) mediante `MatSnackBar`.

## Estructura

```
src/
  components/
    app/                      Componente raíz (cabecera + router-outlet + footer)
    boton-cancelable/         Botón con confirmación (modo texto / icono)
    listado-mascotas/         Listado + estados de carga
    listado-mascotas-item/    Tarjeta de una mascota en el listado
    mascotas-buscador/        Buscador por nombre y tipo
    detalle-mascota/          Ficha completa de una mascota
    formulario-mascota/       Alta y edición (Reactive Forms)
    no-encontrado/            Página 404
  config/                     Rutas y configuración de la app
  models/                     Mascota, tipos y estado de carga
  services/
    mascotas/                 Servicio (abstracto + implementación con HttpClient)
    toast/                    Wrapper de MatSnackBar
dev/
  backend.json                Datos de prueba para json-server
```

## Backend (json-server)

No hay backend real: usamos `json-server` con los datos de `dev/backend.json`.
El servicio aplica una demora artificial de 3 segundos para poder ver los mensajes de carga.

La búsqueda usa la sintaxis de json-server v1:
- `GET /mascotas?nombre:contains=<texto>` (coincidencia parcial)
- `GET /mascotas?tipo=<tipo>` (coincidencia exacta)

## Cómo arrancar

```bash
npm install
npm run dev        # arranca json-server (puerto 3000) + ng serve (puerto 4200)
```

O por separado:

```bash
npm run dev:backend   # json-server
npm start             # ng serve
```
