
# Angular

Framework para TS con el que montar aplicaciones web, basada en el estandar de WebComponents. Actúa como contenedor de inversión de control.

# Typescript

Lenguaje que está fuertemente orientado al paradigma de la programación orientada a objetos. 
Se transpila (algo así como compilar) a JS, y se ejecuta en el navegador.

# NodeJS

Viene a ser el equivalente a la máquina virtual de Java, pero para JS. Es un entorno de ejecución para JS, que permite ejecutar JS fuera del navegador.
Aunque nuestra web acabará siendo JS, y correrá sobre el interprete del navegador, NodeJS nos hace falta al trabajar en Angular, ya que nos permite:
- transpilar nuestro TS a JS.
- montar un servidor local para servir nuestra web, y poder probarla en el navegador.
- Y muchas más cosas.

# Utilizar diseños/arquitecturas de componentes desacoplados (NO MAS MONOLITOS)

## Separación que hoy en día impera en el mundo web: FRONTAL vs BACKEND

Hoy en día, un backend no produce HTML, sino que produce datos en formato JSON. El frontal consume esos datos y los transforma en HTML dinamicamente, para mostrarlos en el navegador. El frontal se ejecuta sobre el navegador cliente. Es ahí donde generamos el HTML, y no en el backend. 

El backend solo produce datos, y el frontal los consume y genera HTML.

## Principio de diseño de software: Principio de la inversión de la dependencia

Resumiendo mucho: Una clase no puede depender de otra clase, sino que ambas deben depender de abstracciones.

Una forma de conseguir respetar este principio era usando el patrón de diseño de software llamado "Inyección de dependencias"

Una clase no debe crear instancias de los objetos que necesita. En lsu lugar, le deben ser suministrados.

Angular ayuda a implementar ese patrón. 
Puedo usar Angular sin usar ese patrón? Si... pero es darme un tiro en el pie. 

# Angular es un contenedor de inversión de control... es decir, nos ayuda a adoptar un patrón de Inversión de control:

Delegamos el flujo de la aplicación a Angular, y Angular se encarga de llamar a nuestros componentes cuando toca, y de suministrarle los datos que necesita (Inyección de dependencias).

# WebComponents

Estándar de la W3C para que podamos definir nuestras propiar marcas html, y que el navegador sepa interpretarlas:
Le explicamos al navegador:
- Cómo debe renderizar nuestra marca html personalizad (HTML, CSS)
- El comportamiento que debe tener (TS->JS)

---

# Comunicaciones asíncronas.

La programación de frontales es puramente asíncrona. Y aquí se diferencia mucho de la programación de backends. En un backend lo normal (98%) es que el código sea síncrono. En un frontal, lo normal (98%) es que el código sea asíncrono.

Asíncrono = Cuando hacemos una comunicación (con el backend, o dentro del propio frontal), no esperamos respuesta para seguir haciendo nuestro trabajo. Lo que pasa es que de alguna forma, cuando la petición sea resuelta, querremos que haya cierto trabajo que ejecute.


---

# Instalación de Angular y creación de primera app

Tenemos montado node -> Node >= 20
Eso nos da a su vez el comando npm (Node Package Manager) que nos permite instalar paquetes de software y automatizar trabajos (Es el equivalente a Maven en Java).

En JAVA yo he descargado unas librerias (via maven o a mano -> .jar). Para que la JVM encuentre las librerias, necesito que estén dadas de alta en el CLASSPATH (variable de entorno).
Cuando trabajo con MAVEN, MAVEN se encarga de configurar el classpath... y para mi es transparente.. pero eso está ahí.

En JS/TS es similar. Las librerías las descargamos con npm, pero hay que darlas de alta para que node las encuentre. 
npm lo hace en automático, igual que MAVEN... pero...!!!!!!!!
Si quiero ejecutar un programa js/ts por fuera de npm, necesito de alguna forma que se configuren las librerias, para que node las encuentre. 
Node viene con otro programa que me permite hacer eso: npx.

npx: Me permite ejecutar un programa js/ts, y configurando node para que node encuentre las librerias que necesita. Estre programa trabaja sobre el mismo fichero que npm: package.json.

> Sea como fuere, nos toca instalar ANGULAR

Y hay 2 formas de hacerlo:
- RAPIDA        Os cuento la rápida

    $ npm install -g @angular/cli
  
    Esto instala el cliente de angular de forma global. ES RAPIDO Y NO LO QUEREMOS NI DE COÑA!
    Si tengo angular ya instalado para un proyecto en el que estoy trabajando o lo que sea... me puede machacar la versión.

    De hecho lo habitual es que trabaje en varios proyectos... y quizás en cada uno tengo una versión de Angular.
    NUNCA QUEREMOS INSTALAR ESTO DE FORMA GLOBAL!
    En los tutoriales es muy cómodo. PERO LUEGO ME DA LA HUEVA DE PROBLEMAS!

    Si hicieramos esto, acabamos con un nuevo comando que poder usar: "ng"
    Y ese comando lo podríamos ejecutar en cualquier carpeta de nuestra computadora. ES TENTADOR! NO LO HACEMOS!

        ng serve -> Monta un servidor local y sirve la web que tenemos en la carpeta actual.
        ng new NOMBRE -> Crea un nuevo proyecto angular en la carpeta actual.
        ng generate component -> Crea un nuevo componente angular en la carpeta actual.

- BUENA         Y hacemos la buena

    Vamos a crear un proyecto JS y dentro de ese proyetco, instalamos angular (cliente incluido).
    Eso me da el comando "ng", pero solo dentro de ese proyecto. 
    Además, será un poquitín más incomodo usarlo. 
    Al no tenerlo instalado de forma global, no podremos poner en la terminal "ng" y que funcione.
    En lugar de ello, usaremos "npx ng" y eso nos permitirá ejecutar el comando "ng" que tenemos instalado en el proyecto.

        npx @angular/cli new miproyecto

        npx ng serve -> Monta un servidor local y sirve la web que tenemos en la carpeta actual.
        npx ng new -> Crea un nuevo proyecto angular en la carpeta actual.
        npx ng generate component -> Crea un nuevo componente angular en la carpeta actual.