# Variable

El concepto de variable cambia de lenguaje en lenguaje. De hecho, incluso dentro del mismo lenguaje hay veces que cambia!

- C, Fortan, Ada: Una variable es una zona de memoria en la que voy dejando valores. Puedo modificar ese valor a futuro. Puedo recuperarlo. Como si fuera una cajita donde pongo y saco cosas.
- TS, JS, JAVA, PYTHON: Una variable aquí es otra cosa.
  Una variable es una referencia un dato que tengo en RAM (tiene que ver más con el concepto de puntero en C).

NOTA: En JAVA están las dos definiciones. Para tipos simple (int, double, char...) es como en C. Para tipos complejos (objetos) es como en TS/JS/PYTHON

```java
String texto = "hola";
```
Lo primero que se ejecuta: "hola"         Crea un objeto en RAM de tipo String con el valor "hola"
                                            Dónde? NPI
                                            La RAM la podemos imaginar como un cuaderno de cuadrícula.
                                            El SO ha abierto el cuaderno por algún sitio y ha escrito "hola".
Lo segundo que se ejecuta: String texto   Crea una variable llamada "texto" que puede apuntar a objetos de tipo String
                                            Si la RAM es como un cuaderno de cuadrícula, la variable es como  un POSTIT.
                                            En mi caso he cogido un postit del taco de los azules (String). 
                                            Hay otros colores (verdes:boolean, rojos:int...).
                                            En el postit escribo "texto"... 
Lo último que se ejecuta: =                y pego el postit en el cuaderno, al lado del valor "hola".

> String texto = "hola";
               ->
X Estoy asignando la palabra "hola" a la variable "texto".
√ Estoy asignando la variable texto al valor hola, que tengo en RAM.

```java
texto = "adios";
```
Lo primero que se ejecuta: "adios"         Crea un objeto en RAM de tipo String con el valor "adios"
                                            Dónde? NPI... Ni mucho menos en el mismo sitio donde estaba "hola"
                                            En este punto tenemos 2 objetos de tipo String en RAM: "hola" y "adios"
Lo siguiente que se ejecuta: texto =       Despegar el postit de donde estaba (apuntando a hola) y pegarlo al
                                            lado del nuevo valor "adios".
                                            El valor "hola" se queda "huerfano" de variable. No hay ya variable que apunte a él. Quizás (o quizás no... npi) el GC (Garbage Collector) lo elimine de la RAM. Tanto en Java, como en JS, TS, Python tenemos Recolector de Basura.

En todo lenguaje los datos tiene un tipo de dato.
Hay lenguajes cuyas variables TAMBIEN tienen tipo de datos: Java, C, C++, TS
Otros no: JS, Python, PHP, Ruby...

En estos lenguajes donde las variables no tienen tipo de dato, las variables pueden apuntar a cualquier tipo de dato.

```js
var numero = 3;
numero = "hola"
numero = true;
```

La variable "numero" NO TIENE TIPO DE DATO. Puede apuntar a datos de cualquier tipo. En este caso primero apunta a un número, luego a un string y finalmente a un booleano:
- 3 -> en js es un dato de tipo number
- "hola" -> en js es un dato de tipo string
- true -> en js es un dato de tipo boolean

Cuando el lenguaje no soporta que las variables tengan tipo de datos, lo llamamos lenguaje de tipado dinámico o débil.
Y ES UNA CARENCIA DEL LENGUAJE.

Esto mismo aplica no solo a las variables, también a las funciones.
En lenguajes de tipado estático, las funcionen deben EXPLICITAMENTE indicar el tipo de dato que devuelven y el tipo de dato de sus parámetros. EN CUALQUIER PROYECTO DE TAMAÑO MEDIO ES UN PROBLEMON!

    > generar_informe(titulo, datos)

    Sé cómo comunicarme con esa función? Qué le tengo que pasar? Que me devuelve? NPI.
    Vete a mirar el código o la documentación. En serio? Año 2026?
    La propia firma de la función ya debería decirme cómo comunicarme con ella. En lenguajes de tipado estático, la firma de la función ya me dice qué parámetros le paso y qué devuelve.

Entonces, por qué existen lenguajes de tipado débil?
Hacemos programas de muchos tipos:
- Aplicación (Cientos de archivos y cientos de miles de lineas de código creados por decenas o cientos de programadores)
- Script     (De uno a 4 archivos... y 200-1000 lineas de código, creado por yo y mi primo)

En nuestro caso, vamos a crear aplicaciones WEB.. NO SCRIPTS WEB. Y necesito un lenguaje a la altura. Necesito un lenguaje de tipado fuerte/estático. Y ese lenguaje es TypeScript.

# Evolución de JS

Hoy en día no existe ningñun lenguaje de programación llamado JavaScript.
En los labores del mundo web, Netscape crea un lenguaje de programación para poder añadir cierta lógica dentro de páginas web.

Las páginas web las creábamos con HTML (Que NO ES UN LENGUAJE DE PROGRAMACIÓN, es un lenguaje de marcado). Y no teníamos forma de definir lógica:

    Navegador
        Página Formulario ------------> Programa en un servidor (php, servlet, jsp, asp...)
                                         Y aquí metía validaciones.
                                         QUE NO ME HAS RELLENADO TAL DATO! PUM OSTION
                         <---html------

La gente de netscape creo un lenguaje de programación para estos escenarios.
Poder hacer programatitas muy simples dentro de las páginas web: Mocha.
Y lo crearon en 10 días. Como programador daba vergüenza ajena llamar a eso lenguaje de programación.
Eso cae en manos de Sun Microsystems, que por entonces estaba en pleno desarrollo del lenguaje de programación Java. Y lo rebautizan como JavaScript. No porque se pareciera a java, solo para aprovechar el tirón den nombre.

Problema, como era interpretado y no había un estandar, cada interprete de cada navegador lo interpretaba a su manera. Y eso era un caos. El JS que iba en un navegador no iba en otro.

Y salió un estandar! Ese estandar lo lleva la ECMA... Y el lenguaje se llama ECMAScript. Pero la gente sigue llamándolo JS, por nostalgia, hábito.

# Irrupción de NodeJS

Google (después de sus peleas con Oracle por JAVA) saca el interprete de JS del navegador Chromium (Chrome, Edge, Opera, Safari...) y permitió su uso fuera de un navegador: JS EXPLOTA !
Desde ese momento puedo usar JS para crear apps fuera de un navegador.

NODE JS es el equivalente en el mundo JS a la JVM en el mundo JAVA.

Se empiezan a hacer apps más grandes en JS (no ya cutre programas de 5 líneas (o 100) dentro de un navegador para comprobar 10 cosas). Y aparece la gran debilidad de JS: el tipado dinámico/débil. NO SIRVE PARA GRANDES AS.Y crean 
un nuevo lenguaje de programación: TypeScript. Que es de tipado estático/fuerte. Y que se transpila a JS y por en de se pude aprovechar de todo el ecosistema de JS y de NodeJS.

Este es el lenguaje que vamos a trabajar en el curso. Es el que usa Angular.
Un lenguaje con soporte completo de Programación orientada a objetos (más amplio que el de JAVA: herencia múltiple, elección de tipos)...


Año 2000:
- Aplicación WEB: JAVA
- Aplicación desktop: AWT, Swing (JAVA)
- Aplicación software embebido : JAVA(JavaME)
- Aplicaciones mobile (más adelante): JAVA (Android)



Año 2026:
- Aplicación WEB: 
  - Backend: JAVA (Spring)
  - Frontal: JS/TS (React, Angular, Vue)
- Aplicación desktop: Visual Basic, JS
- Aplicación software embebido : Python, C
- Aplicaciones mobile (más adelante): Kotlin (Android), Swift (iOS)


---

# Typescript

Es un lenguaje de programación. Se parece a JS? No mucho. Evidentemente en los 2 tenemos BUCLES(for while), condicionales (if...) pero poco más. Alguna leve similitud en la sintaxis, pero no mucho más.

De hecho hay una cosa curiosa.

> Typescript es un lenguaje compilado o interpretado?

Es raro. De hecho es un lenguaje que se transpila a JS. JS es interpretado.

.ts -> transpilación -> .js

Transpilar es un proceso similar a la compilación.
Hablamos de compilar cuando pasamos de un lenguaje de programación a otro de más bajo nivel.
    C    -> ASM
    Java -> Bytecode
Transpilar es un proceso similar, pero no es exactamente lo mismo. Hablamos de transpilar cuando pasamos de un lenguaje de programación a otro del mismo nivel de abstracción.
    TS -> JS

Ese JS es lo que distribuimos y ejecutamos en el navegador.
El navegador INTERPRETA JS.

> Si al final trabajo con JS, ¿para qué me sirve TS?

Si fueran similares no tendría ningún sentido.
Y la cosa es que TS es muy diferente de JS:
- Tipado estático/Tipado fuerte

# Desarrollo web

    Internet : Conjunto de REDes DESCENTRALIZADAS, que me permiten conectar máquinas separadas físicamente cientos o miles de kms

    WEB: Uno de los servicios que podemos disfrutar sobre internet. Otros: Email, FTP, VoIP, Streaming, juegos online...
    La WEB como concepto lo crea Tim Berners-Lee en 1989: Formato para enviar documentos (con formato): HTML + Protocolo para su solicitud/envío: HTTP

    Cliente                             Servidor
    Parte de una app ------------->     Otra parte de la aplicación

    Navegador de Internet - html ->     Servidor app + Aplicaciones
                            http                                php, servlets, jsps, asp

El mundo ha cambiado! Y eso se ha quedado totalmente obsoleto! Por muchos factores:
1. Esa forma de diseñar software es lo que hoy en día conocmos conmo soluciones MONOLITICAS.
   Y antes pensábamos que eran guays!
   La hostia nos la llevamos después. NO HABIA QUIEN MANTUVIERA ESOS SISTEMAS. OTRA VEZ! *1
2. El frontal WEB ya no es el rey.
    Hoy en día tenemos decenas de frontales:
        App Android
        App iOS
        App Desktop
        Navegador
        IVR (Sistemas de respuesta de voz)
        Asistentes: Alexa, OK Google, SIRI


        Servidor                                            Frontales

            Programas reutilizables ----> json ---------->  Navegador web
                                                                Programas JS que corren en el navegador
                                                                Que hacen peticiones a un servidor, reciben JSON y generan HTML
                                                                EN EL CLIENTE!
                                                            App IOS
                                                            App Android
                                                            Siri
3. SPA: Single page application.
   Hoy en día una aplicación web tiene un solo fichero html.
   Y lo que hacemos es IR MUTANDO el código HTML de ese fichero (Con js... en base a los archivos JSON que mande un servidor)
4. Empezamos a montar muchas apps dentro de mi empresa. Y Mucho del código html de esas aplciaciones (y de su lógica asociada) me gustaría reutilizarla. Y APARECE UN NUEVO CONCEPTO: Componente WEB

    Web Componentes es un estndar del W3C, igual que HTML o CSS.

    Son componente reutilizables.. entre proyectos.. o dentro de mi proyecto.
    Básicamente un componente web es una marca HTML CUSTOM que yo creo.
    Y enseño al navegador a usar esas marcas HTML, a interpretarlas, a renderizarlas.
    (Eso hace Angular o React, Vue)

    Seguiremos trabajando algo con HTML estandar... pero el grueso de mi app son marcas HTML que yo me invento.
    Todo navegador hoy en día permite aprender marcas html nuevas, personalizadas.

# Inversión de control ( Inversión de dependencias, inyección de dependencias)

En el mundo del desarrollo de software hay ciertos principios, que nos gusta respetar. Entre ellos destacan los principios SOLID.
SOLID son 5 principios. Puedo respetarlos o no. Lo único que me garantizan es que si los respeto mi software será más fácil de mantener y evolucionar.. y probar.
- S: Single responsibility principle (Principio de responsabilidad única)
- O: Open/Closed principle (Principio de abierto/cerrado)
- L: Liskov substitution principle (Principio de sustitución de Liskov)
- I: Interface segregation principle (Principio de segregación de interfaces)
- D: Dependency inversion principle (Principio de inversión de dependencias)

# Principio de inversión de la dependencia:

Una clase no debe depender de una implementación de otro componente. En su lugar , ambas clases deben depender de abstracciones (interfaces).

# Patrón de inyección de dependencias
Un patrón es una forma de escribir código, de resolver un problema. EÉste nos ayuda a respetar el ppo de inversión de la dependencia:
>Una clase nunca debería crear instancias de los objetos que necesite... en su lugar le deben ser suministrados.

# Principio SoC: Separation of Concerns (Separación de preocupaciones)
Lo enunción un grandisimo programador llamado Edsger Dijkstra. En el año 72 recibió el premio Turing. Su discurso de aceptación se titulaba "The Humble Programmer" (El programador humilde). 

# Inversión de control

Es un patrón, otro, por el cuál CEDO A UN FRAMEWORK al control del FLUJO de mi programa.
Yo ya no escribo el flujo de mi programa. Eso lo escribe el FRAMEWORK.

Quiero montar una ETL.
> La detallo: ESTO ES DECLARATIVO!
 - Quiero que al arrancar mande un email, informando de ello.
 - Eh.. también que al acabar mande un email, informando de ello.
 - Quiero que los datos los cargue en un Oracle, en la tabla Personas.
 - Ah... los lee de un fichero csv, donde vienen ombre de una persona,email,fecha denacimiento, dni...
 - Cuando procesa una linea, debe validar el dni. Si no es válido se anota y no se manda a Oracle.
 - Y cuando procesa una linea, debe validar la fecha de nacimiento.. si no es mayor de edad, se anota y no se manda al oracle.

Lo programamos: (en un pseudo lenguaje)

LINEA 1: Enviar email de inicio
LINEA 2: Abrir fichero csv
LINEA 2.5: Abrir conexión a Oracle
LINEA 3: BUCLE (para cada linea del fichero)
    LINEA 4: SI dni no es valido:
        ANOTO
        CONTINUE! a por otro
    LINEA 5: SI fecha de nacimiento no es mayor de edad:
        ANOTO
        CONTINUE! a por otro
    LINEA 6: Mandar a Oracle (INSERT)
LINEA 6.5: Cerrar conexión a Oracle
LINEA 7: Mandar email de fin (con los datos no válidos)

ACABO DE DEFINIR EL FLUJO DE MI PROGRAMA....
Si fuera JAVA, este código iría en el main.

Puedo hacer esto... o puedo usar un contenedor de inversión de control: Spring, Angular:
Si hago eso, el framework es el que genera ese código por mi.Con el fra
mework hablaré usando un lenguaje DECLARATIVO (no un lenguaje imperativo)

# Paradigma de programación:
Nombre cutre que los desarrolladores ponemos a una forma de usar el lenguaje. Existe también en los lenguajes naturales:

> Felipe, IF (condicional) hay algo que no sea silla debajo de la ventana:
    > QUITALO!    IMPERATIVO
> Felipe, IF NOT silla debajo de la ventana: 
    > If not silla (silla ==false) THEN
    >GOTO IKEA
    >     compra silla
    > Felipe, pon una silla debajo de la ventana. IMPERATIVO


> Felipe, debajo de la vanata tiene que haber una silla. Es tu responsabilidad. DECLARATIVO

> Digo lo que quiero tener.. no cómo conseguirlo
> A quién le largo el marrón de determinar (EL FLUJO) la secuencia necesario en mi caso para conseguir eso que quiero conseguir? A FELIPE

Con Angular, con Spring en JAVA hablamos lenguaje declarativo:
Sease un componente WEB
Sease un servicio
Te has enterado? Pues pon tu el flujo de mi app.

En java, cuando uso Springboot, cuántas lineas tiene el main? 1
```java
public class MiApp {
    public static void main(String[] args) {
        SpringApplication.run(MiApp.class, args); // Aquí estoy haciendo la INVERSION DE CONTROL:
        // Spring: EJECUTA MI APLICACION. Te paso el mando! Ponle flujo!
    }
}
````

Y en angular, en el archivo main.ts
```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule) // Angular, ejecuta mi aplicación
  .catch(err => console.error(err));
```
Y YA! Da igual cual sea la app Angular. Todas son igual... Esa es la única linea de código.

Y cómo angular o spring son quienes van a ejecutar mi aplicación, mirarán los componentes que tiene MI APLICACION,
Y VERA SI TIENEN DEPEMDENCIAS (suministrador de diccionarios). Y si las tienen Angular o Spring escriben por mi:
```java
        SuministradorDeDiccionarios suministrador = new SuministradorDeDiccionariosDesdeFicheros("carpeta_de_diccionarios");
```

Angular o Spring son frameqworks que
- Me regalan (e imponen) el flujo a mi aplicación
- Me ayudan a adoptar el uso de un patrón de inyección de dependencias. PARA QUE ASI PUEDA RESPETAR EL PPO de inversión de la dependencia.
- PARA QUE PUEDA CONSTRUIR SOFTWARE MAS FACIL DE MANTENER A FUTURO.

---

En angular tendremos un monton de ficheros .ts, .css, .html. Y se empaquetarán para distribuir en:
- 1 fichero html
- 1 fichero js
- 1 fichero css
Eso es lo que se distribuye.
Eso lo pondremos en un servidor web que lo sirva a los navegadores.

El proceso de empaquetar todo eso, y generar lo que vamos a distribuir lo hace un programa ng (a su vez usa otros programas)

ng es una herramienta que tenemos en angular (el cliente de angular).
Ese comando nos da muchas cosas / utilidades. No solo empaquetar. También generar un entorno de desarrollo (con un servidor web local) para poder ir probando la app. Y además, compilación(transpilación)+empaquetado en caliente, cada vez que hacemos un cambio en los archivos fuente, de forma que el desarrollo sea rápido.

Ahora bien... por debajo de todo eso, estará nodeJS.
El js que genero (el que distribuyo, el que pruebo) es interpretado por el interprete del NAVEGADOR.
Entonces... para que quiero NodeJS (Otro interprete)?
- ng (ese comando), el que transpila, empaqueta, genera un servidor web local de desarrollo , ese programa está desrrollado en JS y se ejecuta sobre NodeJS.
Mi aplicación se interpretará por el intérprete del navegador... pero para crear mi aplicación, necesito utilidades que corren en mi máquina. Y esas utilidades están creadas en JS y necesito un intérprete para ejecutarlas: NODE

Node viene con varias utilidades. Igual que la JVM viene con varias utilidades.
- Cuando instalo la JVM me viene un comando que es java.exe (la máquina virtual)
- Pero tambien viene javac -> Compilador de java
- Viene jar -> empaquetador de ficheros jar

Con node es igual. Viene node (interprete), pero vienen más cosas.
Con node me viene npm (el maven de js).
En maven necesito un archivos de configuración de proyecto: pom.xml
npm usa su propio archivo de configuración (equivalente a pom.xml): package.json

En un proyecto node/npm tendremos la siguiente estructura:  
    proyecto/
        package.json
        node_modules/
          Aqui vendrán todas las dependencias de mi proyecto (librerías)
        src/
          Aquí vendrá el código fuente de mi proyecto

---
# Qué es Angular?

Un framework de TypeScript, que aporta Inversión de Control para trabajar con componentes y servicios de frontal web.

---

Nota *1: LA GRAN CRISIS DEL SOFTWARE!

A finales de los 60. Llevábamos 2 décadas creando software... pero no había método, diseño, arquitectura, conceptos, principios. Reinaba la anarquía. Los sistemas se hicieron cada vez más complejos... hasta ser inmantenibles!

A principios de los 70 sale como disciplina la INGENIERIA DE SOFTWARE, para poner orden en todo esto.

Aprendimos algo muy valioso: 
UN PRODUCTO DE SOFTWARE POR DEFINICION ES UN PRODUCTO SUJETO A CAMBIOS Y MANTENIMIENTOS.
Qué un programa funcione, se da por descontado. Eso es fácil.
La clave es que sea mantenible en el tiempo!

---

# Programación funcional

Hay muchos paradigmas de programación:
- Imperativo                Escribo secuencias de instrucciones que la compotadora debe rpocesar.
                            En ocasiones quiero romper la secuencialidad: Estructuras de conftrol de flujo (condicionales, bucle)
- Procedural                Cuando agrupo secuencias de instrucciones bajo un nombre -> FUNCION, PROCEDIMIENTO,
                            METODO, SUBRUTINA, y puedo ejecutar la secuencia mediante el nombre:
                            Para qué? Que aporta?
                            - Reutilizar código
                            - Organizar el código/Mejorar legibilidad -> Mejorar mantenibilidad
- Orientación a objetos     Todo lenguaje permite manejar tipos de datos.
                            En base a su tipo de datos, un dato tiene unas características y unas operaciones soportadas:

                                    Se caracteriza por?         Soporta operaciones de?
                            Texto   Secuencia de caracteres     aMayusculas() longitud()
                            Fecha   Día, mes, año               sumarDias(), restarDias(), esBisiesto(), siCaeEnJueves()

                            Hay lenguajes que me permiten definir mis propios tipos de datos, con sus propias características y operaciones (CLASE) y eos lenguajes que permiten hacer esto decimos que soportan el paradigma de orientación a objetos (herencia, polomorfismo, sobreescritura...)
- Declarativo
- Funcional                 Cuando el lenguaje me permite que una variable apunte a una función y 
                            ejecutar la función desde la variable decimos que soporta paradigma funcional.
                            El tema no es lo que es la programación funcional. Es facil.
                            El tema es lo que me permite llegar a hacer el lenguaje cuando soporta esta chorrada:
                            - Pasa funciones como argumento a otras funciones
                              Nos permite inyectar LOGICA EN TIEMPO DE EJECUCION, no solo datos! 
                            - Tener funciones que devuelvan funciones como resultado (CLOSURE)

---

# Asincronía
Una comunicación es asíncrona cuando el emisor no espera respuesta del receptor para seguir con su ejecución. 
En una comunicación síncrona, el emisor espera a que el receptor le responda para seguir con su ejecución.

HTTP es un protocolo SINCRONO unidireccional de comunicación:

    EMISOR(navegador) ---> http request --> RECEPTOR(servidor) ---> http response --> EMISOR(navegador)

No es el único protocolo que usamos en el mundo web: WEB SOCKET

    EMISOR (navegador)-> mensaje -> RECEPTOR(servidor)
    EMISOR (servidor) -> mensaje -> RECEPTOR(navegador)

PROMESAS + CALLBACK