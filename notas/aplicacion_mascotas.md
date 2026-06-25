# Aplicación de Mascotas.

Esta aplicación Angular tendrá la siguiente funcionalidad:

- Hablará con un backend mediante un servicio para:
  - Dar de alta mascotas
  - Eliminarlas
  - Modificarlas
  - Listarlas (con busqueda)

- No tenemos un backend real.. usaremos json-server por ahora. Más adelante se sustituirá por un backend real.

## Datos de una mascota

- Id: number (lo asigna el backend)
- Nombre: string (obligatorio)
- Tipo: string (obligatorio, lista cerrada)
- Raza: string (obligatorio)
- Edad: number (obligatorio, 0-30)
- Foto: string url (obligatorio)

### Los formularios de alta y modificación de mascotas se harán con Reactive Forms.

Incluiremos las validaciones oportunas.
Para tipo, partiremos de una lista cerrada: "perro", "gato", "conejo", "hamster", "loro".
Raza será un campo abierto, pero obligatorio.
Edades con un mínimo de 0 y un máximo de 30 años.
La foto (url) será un campo obligatorio.

Queremos poder hacer búsquedas por nombre y por tipo de mascota.
La búsqueda se hará en el backend (no en cliente), usando los query params de json-server v1 (por ejemplo `?nombre:contains=<texto>&tipo=<tipo>`). El servicio expondrá un método de búsqueda que reciba los filtros y devuelva un Observable con el resultado.

## Componentes:

Componente principal app-component, que contendrá un menú/cabecera y un router-outlet para mostrar los componentes de cada ruta. Le pondremos también un footer.

### Routers/componentes secundarios:

- /editar-mascota/<id> | /nueva-mascota -> FormularioDeMascotaComponent: para dar de alta y modificar mascotas. Se usará un formulario reactivo.
  - Es el mismo componente para ambos casos: si recibe un `id` por la ruta trabaja en modo edición (carga la mascota y la actualiza); si no, trabaja en modo alta.
- /listado-mascotas -> ListadoDeMascotasComponent: para listar las mascotas y poder eliminarlas. Incluirá un buscador por nombre y tipo de mascota.
    A su vez, este componente dependerá de otros componentes:
    - ListadoDeMascotasItemComponent: para mostrar la información de una mascota individual en el listado. 
      - En el listado solo mostraré el nombre, tipo y raza de la mascota, y un botón para eliminarla (BotonCancelableComponent en modo icono).
    - MascotasBuscadorComponent: para mostrar el buscador de mascotas por nombre y tipo.
- /detalle-mascota/<id> -> DetalleDeMascotaComponent: para mostrar la información completa de una mascota concreta.
  - Sacaremos todos los campos de la mascota, incluyendo la foto y la edad.
  - También habrá un boton para eliminar la mascota (BotonCancelableComponent en modo texto), que nos llevará de nuevo al listado de mascotas.
  - También un botón para modificar la mascota, que nos llevará al formulario de modificación de la mascota.
  
# Otros componentes

BotonCancelableComponent: Para toda operación peligrosa... (salir de formularios, eliminaciones...)
 (similar al que hemos hecho en el proyecto miproyecto)
 - Se usará desde cualquier sitio donde haya una operación peligrosa (eliminar desde el listado, eliminar desde el detalle, cancelar/salir de un formulario con cambios, etc).
 - Podrá presentarse de dos formas según el contexto:
   - Modo TEXTO: con una etiqueta visible (por ejemplo en la vista de detalle).
   - Modo ICONO: solo con un icono (por ejemplo en cada item del listado).
 - El modo y los textos/iconos serán configurables mediante @Input.

# Servicios

Tendremos un servicio (con inyección de dependencias) que se encargará de hablar con el backend (json-server por ahora) para hacer las operaciones de alta, baja, modificación y listado de mascotas.

Los componentes harán uso de este servicio para realizar las operaciones necesarias.
Esas operaciones serán asíncronas, por lo que el servicio devolverá Observables.
Los componentes tras hacer una solicitud de operación, irán informando al usuario de lo que está pasando (cargando, error, éxito, etc) mediante un toast o un diseño de componente concreto (por ejemplo cargando datos...).
Para los toasts usaremos MatSnackBar de Angular Material (coherente con el resto de la UI).
Para uniformar los estados en los componentes usaremos un estado tipo: idle | loading | success | error.

En el servicio, introduciremos una demora (delay) de 3 segundos, para poder ver los mensajes de carga y éxito/error en el toast.

# Datos de prueba
Habrá que configurar un fichero json para el json-server... y meter algunos datos de prueba para poder ver la aplicación funcionando.

# Rutas

- Ruta por defecto: `''` redirige a `/listado-mascotas`.
- Ruta comodín `**`: mostrará una página/components de "No encontrado" (404).

# Diseño estético

Queremos una aplicación con un diseño moderno. En tonos azules y naranjas.
Vamos a usar los componentes de Angular Material para los formularios, botones, inputs, etc.