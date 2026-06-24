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