# Componentes Web con Angular

Crear un componente es fácil. Necesitamos 3 archivos:
- Clase TS
- Plantilla HTML
- Estilos CSS

Empezamos siempre por la clase. La clase lleva la anotación @Component:
Esta anotación indica que la clase es un componente de Angular. 
La anotación recibe un objeto con varias propiedades:
- selector: El nombre de la marca custom que representará al componente.
- templateUrl: La ruta del archivo HTML que contiene la plantilla del componente.
- styleUrls: Un array con las rutas de los archivos CSS que contienen los estilos del componente

A esa marca le podemos asociar/definir atritutos HTML.
Para eso usamos otra anotación que nos ofrece Angular: @Input. Esta anotación se pone delante de la definición de un atributo de la clase.

```ts

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.html',
    styleUrls: ['./usuario.css']
})
export class UsuarioComponent {
    @Input() datos: string = '';
    @Input() mode: 'compact' | 'extended' = 'compact';
    @Input() extensible: boolean = false;
}
```

# Operadores en TS

    =    Asignación

    let numero = 4;

    ==  Comparación de igualdad (valor) ignorando el tipo de dato

    let texto = "4";

     numero == texto // true
       Los tipos de datos de numero y texto son diferentes. Uno es un número y otro un texto.
       Pero si convirtiera el tipo de dato de uno al del otro (numero-> string o texto->number), entonces serían iguales.

    ===  Comparación de igualdad estricta (valor y tipo de dato)

        numero === texto // false
        Los tipos de datos de numero y texto son diferentes. Uno es un número y otro un texto. Por lo tanto, no son estrictamente iguales.


    CONDICION ? VALOR_SI_VERDADERO : VALOR_SI_FALSO

        Operador ternario. Es un if como una expresión.


---

FRONTAL                                                 Backend
                        ----- http Request ----------->
                        <---- httpResponse (JSON) -----
    Componentes Web                                     Servicio WEB <--------->  BBDD
        App
        Usuario

Montar un backend para pruebas.. por lo menos le estimo 4 o 5 minutos.

Vamos a usar JSON-SERVER. Nos permite montar FAKES de backends RESTful en 5 minutos. Nos permite hacer pruebas de front sin tener que montar un backend real.

---

Los tiempos han cambiado... Y las arquitecturas y patrones de desarrollo y diseños también Y MUCHO!
Le damos una importancia EXTRAORDINARIA a hacer código fácil de mantener y de evolucionar.
NO QUEREMOS MONOLITOS.
NO QUEREMOS COMPONENTES ACOPLADOS.

Por eso aplicamos ciertos principios de desarrollo de software y ciertas arquitecturas.

Un backend hoy en día se monta con una determina arquitectura...
Ya no escribo un JSP(ASP, PHP) en el que genero HTML, llamo a la BBDD, meto lógica de negocio, amndo un email = DESASTRE ABSOLUTO RUINOSO 100%

En backend SPRING, .net, los grandes frameworks de backend, nos invitan (obligan) a utilizar ciertas arquitecturas.

    BACKEND                                                                                 FRONTAL
    ------------------------------------------------------------------------------------    ------------------------------------------------

    BBDD   <---                                                Servicio Web                   Formulario Usuario
                                                                    .jsp                      <form action="http://localhost:8080/altaUsuario.jsp" 
                                                                    .asp                                 method="POST">
                                                                    .servlet            

    ANTIGUAMENTE ^^^^^ APESTA !!!! YA NO!


    HOY EN DIA !!!!!

    Aplicar ciertos principios de desarrollo de software y ciertas arquitecturas.
    - Cohesión y Acoplamiento
    - SoC (Separation of Concerns)
    - SOLID (S = Single Responsibility Principle)

    BACKEND                                                                                         FRONTAL
    --------------------------------------------------------------------------------------          ------------------------------------------------
    SQL                                                                                               
     v
    BBDD   <---   Repository                 <-- Service           <--- HttpRestController   <----    Servicio De Frontal  <--  Formulario Usuario
     MySQL                                                                         
     Garante       Lógica de persistencia         Lógica de negocio      Lógica de exposición          Lógica de comunicación    Lógica de captura
     del dato      contra un motor concreto                              del Servicio por un           con el backend            de datos
                                                                         protocolo

                                                                   <--- SoapController

                                                                   <--- WebSocketController 
                                                
                                                altaDeUsuario(datosDeUsuario)

    ARQUITECTURA DE COMPONENTES DESACOPLADOS
                                                                    

    DNI
    1-8 + LETRA
    Y no cualquier letra.. una letra que encaje con el número.

    Lógica asociada al TIPO DE DATO

    FECHA DE NACIMIENTO dia mes año   federico

    CREATE TABLE usuarios (
        id INT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        fechaNacimiento DATE NOT NULL
        edad INT NOT NULL,
        dni DNI NOT NULL,
    );    PLSQL
                        ^^^^
                        IF (lo que lo que viene nbo es un DATE) -> HOSTION!


                        DESARROLLADOR JUNIOR ---> DESARROLLOR SENIOR ---> ARQUITECTO DE SOFTWARE
                        --------------------------------------------


Aplicación de solicitud de días libres de un empleado.

- COMPONENTE APLICACION.
- Componente menu
- Componente formulario de solicitud de días libres
- Componente para ver los detalles de una solicitud de días libres que se ha hecho.
- Componente para aprobar o rechazar una solicitud de días libres que se ha hecho.
- Componente listado de solicitudes de días libres que se han hecho por empleados y que yo tengo que aprobar o rechazar.
- Componente para cada fila del listado de solicitudes de días libres que se han hecho por empleados y que yo tengo que aprobar o rechazar.
- Componente listado de solicitudes de días libres que yo he hecho.. para ver en que estado están.
- Tengo un componente para cada fila del listado de solicitudes de días libres que yo he hecho.
- Componente TOAST para notificaciones al usuario: Se está grabando la solicitud de días libres, se ha grabado correctamente, se ha producido un error al grabar la solicitud de días libres, etc.  
- Componente para la configuración de la aplicación: Configuración de los días libres que se pueden solicitar, configuración de los tipos de días libres que se pueden solicitar, etc.

    Componente App
+------------------------------------+
| Menu           |                   |
|  Nueva         |    Cargo          |
|  Seguimiento   |    componentes    |
|  Por aprobar   |    dinamicamente  |
|  Configuración |                   |
+------------------------------------+ 
                                      -> FRONTAL2 (ios)
    BACKEND -> JSON (FORMATO BACKEND) -> FRONTAL (Clase Usuario) <- Componente usuario / Componente ListadoUsuarios 
                    ^                                ^
                    +--------------------------------+

usuario: {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "pepito@pepe.com",
    "urlFoto": "https://randomuser.me/api/por"
}

TODOS LOS COMPONENTES DEL FRONTAL ESTAN ACOPLADOS a la estructura de datos que devuelve el backend.
Si hay un cambio en esa estructura de datos, todos los componentes del frontal se rompen y hay que reescribirlos.

usuario: {
    "id": 1,
    "firstname": "Juan",
    "lastname": "Pérez",
    "email": "pepito@pepe.com",
    "url": "https://randomuser.me/api/por"
}

