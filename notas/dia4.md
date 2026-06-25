# Formularios en Angular

Históricamente ha habido varias formas de montar estos formularios.
La forma más moderna, potente y recomendada hoy en día son lo que llamamos Formularios Reactivos.

Para usar formularios reactivos, necesitamos hacer varias cosas:
1. Habilitar los formularios reactivos a nivel del proyecto
2. Al hacerlo, cualquier componente puede solicitar una inyección de dependencia: Puede solicitar un CONSTRUCTOR DE FORMULARIOS: FormBuilder
NOTA: Exactamente lo mismo que ya hemos hecho para tener Clientes HTTP que hagan peticiones a un backend.

Una vez hecho esto:
El trabajar con un formulario tiene 2 partes diferenciadas:
- Una cosa es la lógica / estructura de información, validaciones del formulario
  - Definir los campos que tiene el fomulario
  - Definir el comportamiento que tiene el formulario
  - Definir las validaciones que tiene cada campo del formulario (si hay campos requeridos.. si hay campos con validaciones especiales)

    ESTO LO HACEMOS EN EL FICHERO TS DE CADA COMPONENTE.

- Otra cosa es la parte visual del formulario, que es lo que el usuario ve y con lo que interactúa.
  - Si quiero ciertos campos en la misma línea, si quiero ciertos campos en columnas, si quiero ciertos campos en filas, si quiero ciertos campos con un tamaño determinado, etc.
  - Si quiero mostrar mensajes de error en ROJO o negrita.

    ESTO LO HACEMOS EN LOS FICHEROS HTML Y CSS DE CADA COMPONENTE.


---
> Nuestro formulario de ejemplo: Formulario de Nuevo usuario

Campos:
- Nombre            Texto
- Apellidos         Texto
- Edad              Número
- Email             Email
- Conduce o no      Checkbox
- Vehiculo que conduce (si conduce) Texto (condicional)
- DNI               Texto (Validación muy especial)
- Direcciones       Campo múltiple
  - Calle
  - Número
  - Piso
  - Puerta
  - CP
  - Población

Nuestro formulario debe permitir a un usuario ir dando de alta varias direcciones (BOTON de añadir dirección)

---

Muy antiguamente, las validaciones de los datos del formulario las hacíamos en Backend.
- Esto quuerremos que siga ocurriendo: El servidor siempre debe validar los datos que le llegan, aunque el cliente ya haya hecho validaciones DE CORTESIA.
- Pero.. querremos meter esas validaciones de cortesia en el propio formulario, evitando mandar datos al servidor que sabemos que van a ser rechazados por el servidor.

Cuando empezamos a aplicar este criterio (al poco de aparecer el lenguaje primigenio de JS), las validaciones que podíamos hacer eran bastante simples. Y además se hacían cuando el formulario iba a ser enviado.
Cuando el usuario pulsaba en el botón de enviar, interceptábamos el evento de enviar, y hacíamos las validaciones. Si había errores, no enviábamos el formulario y mostrabamos los errores.

Hoy en día hacemos otra cosa. Las validaciones las vamos a realizar sobre la marcha, a medida que el usuario va rellenando los campos del formulario. Y además, vamos a mostrar los errores de validación en tiempo real, a medida que el usuario va rellenando los campos.
Hacemos validaciones ASINCRONAS! en paralelo a que el usuario va rellenando los campos del formulario.

Esto es lo que conocemos como Formularios Reactivos. Y es lo que vamos a usar en Angular.

---

Sobre el campo DNI y su validación.
Lo primero es mirar que tenga pinta de DNI: Si tiene entre 1 y 8 dígitos, seguidos de una letra mayúscula.

15J
02345127 j
02.345.127 j
02.3451.27-j
02.3451.27 j
02.3451.27j
02.3451.27j

Qué nos puede ayudar a hacer esta validación? de aspecto? EXPRESIONES REGULARES

PATRON: SERIE DE SUBPATRONES

SUBPATRON: Secuencia de caracteres + modificador de cantidad
    Secuencia de caracteres:
        hola                    Ese tyexto debe aparecer tal cual
        [hola]                  Debe aparecer cualquiera de esos caracteres
        [a-z]                   Debe aparecer un caracter en ese rango ASCII
        [0-9]                   Debe aparecer un caracter en ese rango ASCII
        [a-zA-Z0-9áñ]
        .                       Cualquier caracter vale
    Modificadores:
        No poner nada           La secuencia de caracteres debe aparecer exactamente 1 vez
        ?                       La secuencia de caracteres puede aparecer 0 o 1 veces
        *                       La secuencia de caracteres puede aparecer 0 o más veces
        +                       La secuencia de caracteres puede aparecer 1 o más veces
        {0,5}                   La secuencia de caracteres puede aparecer entre 0 y 5 veces

    10.000.000
        10.000
            10
    1000000000

    ^((([0-9]{1,2}[.][0-9]{3}[.][0-9]{3})|([0-9]{1,3}[.][0-9]{3})|([0-9]{1,8}))[ -]?[a-zA-Z])$
    regex101

---

# Angular Outputs

Cuando creamos un componente, hemos visto que al final, lo que estamos definiendo es nuestra propia marca HTML.
Hemos visto que podemos pasarle datos a esa marcaHTML (componente) mediante atributos HTML. Y hemos visto que esos atributos HTML se llaman Inputs.

Pero, en angular y en HTML... los componentes pueden lanzar eventos. Y esos eventos pueden ser escuchados por el padre del componente.

En HTML estandar:
  <div class="valor-css" onclick="alert('Hola')">Hola</div>

En angular:
  <app-mi-componente [attrb]="valor" (miEvento)="alert('Hola')"></app-mi-componente>

Hemos visto como definir Inputs en un componente, pero no hemos visto como definir Outputs.

Al final, una app basada en componentes Web (como lñas que creamos con Angular) se basan en comunicaciones entre componentes.

  PADRE -> HIJO (atributoHTML / Input)
  HIJO -> PADRE (evento / Output)

---

# Montar una app completa con Angular que gestione BBDD de mascotas

^^^ Lo encargamos a un agente de ia

- Copilot
- Claude


---

Vamos a montar un BotonCancelable... Es un nuevo componente:

  <app-boton-cancelable>
    GUARDAR
  </app-boton-cancelable>

  <app-boton-cancelable>
    RESETEAR FORMULARIO
  </app-boton-cancelable>  
  
  <app-boton-cancelable>
    SALIR DEL FORMULARIO
  </app-boton-cancelable>  

  Estaba en un listado de Mascotas.
  Pulso sobre el botón de nueva mascota.
  Se abre un formulario de nueva mascota.
  Relleno algunos datos.
  Y pulso sobre el botón de SALIR DEL FORMULARIO.  (Si el formulario esta DIRTY, me debería que confirme la accion)
  El formulario se cierra, y vuelvo al listado de mascotas.
  Me debería sacar del formulario de vuelta al listado de mascotas.

    BOTON:  
      Volver al listado de mascotas
      Si el formulario está sucio:
        Al pulsar el botón:
          - Está seguro?
            - Si, quiero salir del formulario ---> Voy al listado
            - No, dejarme en el formulario    ---> Cancela


Podría aplciar igual a: Eliminar..

<button (click)="confirmarEliminar()">Eliminar</button>

En nuestro botón cancelable podríamos tener algo asi:

<app-boton-cancelable 
  (confirmado)="confirmarEliminar()" 
  (cancelado)="cancelarEliminar()"
  mensajeBoton="Eliminar"
  mensajeConfirmacion="Si, quiero eliminar este registro"
  mensajeCancelacion="No, dejarme en el formulario"
></app-boton-cancelable>
