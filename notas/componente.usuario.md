

<app-usuario datos="" mode="compact|extended" extensible="true|false"></app-usuario>


Datos?

- ID(no lo pintamos... solo está ahí)
- Nombre
- Apellido
- Email
- URL Foto

    +-------------------------------------+
    |         | Nombre: Juan              |
    |  Foto   | Apellido: Pérez           |
    |         | Email: juanito@perez.com  |
    +-------------------------------------+

    <div class="usuario-extendido">
        <img src="foto.jpg" class="foto" />
        <div class="nombre">Juan</div>
        <div class="apellido">Pérez</div>
        <div class="email">juanito@perez.com</div>
    </div>


    .usuario-extendido {
        display: grid;
        grid-template-columns: 100px 1fr;
    }
    .foto {
        width: 100px;
        height: 100px;
        grid-row: 1 / span 3;
        grid-column: 1;
        object-fit: cover;
        object-position: center;
    }
    .nombre {
        grid-row: 1;
        grid-column: 2;
    }
    .nombre:before {
        content: "Nombre: ";
    }
    .apellido {
        grid-row: 2;
        grid-column: 2;
    }
    .apellido:before {
        content: "Apellido: ";
    }
    .email {
        grid-row: 3;
        grid-column: 2;
    }
    .email:before {
        content: "Email: ";
    }


    +-------------------+
    |  F  | Juan Pérez  |
    +-------------------+


{ 
    'usuario-extendido': true , 
    'usuario-compacto': false
}

{
      id: '4',
      nombre: 'Federico',
      apellidos: 'Pérez',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1ITs_hgsdCzhKoOZ6eIDl9x--VqbbSHqgwAyA8T2NA&s=10',
      email: 'juanito@perez.com'
  }