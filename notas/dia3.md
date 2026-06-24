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