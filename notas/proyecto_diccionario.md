Quiero montar una app para consultar palabras en un diccionario

Comando:

$ buscarSignificados PALABRA IDIOMA

$ buscarSignificados melón ES
La palabra melón en español significa:  
- Fruto del melonero
- Persona con pocas luces (eres un melón)

$ buscarSignificados archilococo ES
La palabra archilococo en español no existe.

$ buscarSignificados archilococo ELF
Lo siento pero no tengo diccionario élfico.

---

BACKEND Quien se encarga de la gestión de los diccionarios (Ficheros txt -> BBDD Relacional -> BBDD NoSQL)
API DE COMUNICACION
FRONTAL (Consola) -> Desktop -> Web
LOGICA INDEPENDIENTE DEL BACKEND Y DEL FRONTAL
Cada diccionario sería un proyecto.
Puedo tener la v1.0.0 de la apicación que funcione con la v1.0.0 del diccionario de español y la v1.0.1 del diccionario inglés. Y mañana meterle la v1.0.0 del diccionario de alemán.
Y cada una de esas cosas tiene / y debe tener un ciclo de vida independiente -> Su propio control de versiones.
---


BACKEND Quien se encarga de la gestión de los diccionarios (Ficheros txt -> BBDD Relacional -> BBDD NoSQL)
API DE COMUNICACION
FRONTAL (Consola) -> Desktop -> Web

```java
package com.curso.diccionarios.api; // -> diccionarios-api.jar
public interface Diccionario {
    String getIdioma();
    boolean existe(String palabra);
    Optional<List<String>> getSignificados(String palabra);// throws NoSuchWordException;
    // melón -> ["Fruto del melonero", "Persona con pocas luces (eres un melón)"]
    // archilococo?
    //   - Lista vacía \
    //   - null        / NO SON EXPLICITAS
    //   - Excepción: NoSuchWordException: NI DE BROMA
    //      Una exception es cara computacionalmente (volcado de la pila de ejecución)
    //      Al menos si tiene una ventaja frente a las otras: ES EXPLICITA
    // Hoy en día en JAVA es una MUY MALA PRACTICA HACER QUE UNA FUNCION DEVUELVA NULL
}
public interface SuministradorDeDiccionarios{
    boolean tienesDiccionarioDe(String idioma);
    Optional<Diccionario> getDiccionarioDe(String idioma);
}
```

```java
package com.curso.diccionarios.impl.ficheros; // -> diccionarios-impl-ficheros.jar
import com.curso.diccionarios.api.Diccionario;
import com.curso.diccionarios.api.SuministradorDeDiccionarios;
public class DiccionarioEnFichero implements Diccionario {
    public String getIdioma() {...}
    public boolean existe(String palabra) {...}
    public Optional<List<String>> getSignificados(String palabra) {...}
}
public class SuministradorDeDiccionariosDesdeFicheros implements SuministradorDeDiccionarios {
    public SuministradorDeDiccionariosDesdeFicheros(String carpeta){...}
    public boolean tienesDiccionarioDe(String idioma) {...}
    public Optional<Diccionario> getDiccionarioDe(String idioma) {...}
}
```
> Vamos a por el frontal. A mi frontal, le debería IMPORTAR si mis diccionarios están en ficheros o en una BBDD?
Nada

```java
package com.curso.diccionarios.frontal; // -> diccionarios-frontal.jar
import com.curso.diccionarios.api.Diccionario;                      // Import a una interfaz
import com.curso.diccionarios.api.SuministradorDeDiccionarios;      // Import a una interfaz
//import com.curso.diccionarios.impl.ficheros.SuministradorDeDiccionariosDesdeFicheros; // Y ACABO DE MATAR EL PROYECTO!
// Me acabo de cagar en el principio de INVERSION DE LA DEPENDENCIA
// Si el día de mañana quiero cambiar el Suministrador de ficheros por un Suministrador de BBDD, TENGO QUE VENIR A ESTE FICHERO! al FRONTAL?
// MAL DISEÑO = MONOLITO: Tengo componentes ACOPLADOS
public class Frontal {
    public void procesarPeticion(String idioma, String palabra, SuministradorDeDiccionarios suministrador){
        //SuministradorDeDiccionarios suministrador = new SuministradorDeDiccionariosDesdeFicheros("carpeta_de_diccionarios");
        if(suministrador.tienesDiccionarioDe(idioma)){
            Diccionario miDiccionario = suministrador.getDiccionarioDe(idioma).get();
            if(miDiccionario.existe(palabra)){
                List<String> significados = miDiccionario.getSignificados(palabra).get();
                System.out.println("La palabra " + palabra + " en " + idioma + " significa: ");
                for(String significado : significados){
                    System.out.println("- " + significado);
                }
            }else{
                System.out.println("La palabra " + palabra + " en " + idioma + " no existe.");
            }
        }else{
            System.out.println("Lo siento pero no tengo diccionario " + idioma);
        }
    }
}
```


    Frontral -> SuministradorDeDiccionarios <- SuministradorDeDiccionariosDesdeFicheros

Realmente aplicando este patrón, solo he largado el problema a otro!
Alguien sigue teniendo que escribir en algún sitio del código: 
```
        SuministradorDeDiccionarios suministrador = new SuministradorDeDiccionariosDesdeFicheros("carpeta_de_diccionarios");
```
Y cuando cambie el suministrador, tendré que ir a ese sitio a cambiarlo. = BAJA MANTENIBILIDAD!



SonarQube: Herramienta de análisis de calidad de código. Hay muchas de estas.
