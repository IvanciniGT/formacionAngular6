import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Página 404 para rutas no reconocidas (ruta comodín **).
@Component({
  selector: 'app-no-encontrado',
  templateUrl: './no-encontrado.html',
  styleUrl: './no-encontrado.css',
  imports: [RouterLink, MatButtonModule, MatIconModule],
})
export class NoEncontradoComponent {}
