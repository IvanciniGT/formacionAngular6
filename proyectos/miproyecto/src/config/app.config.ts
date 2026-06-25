import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { UsuariosServiceImpl } from '../services/usuarios/usuarios.service.impl';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: UsuariosService,
      useClass: UsuariosServiceImpl
    },
    provideHttpClient(),
    // Solicitamos tener disponible el constructor de formularios reactivos de Angular
    // provideReactiveForms()
    // Se mete en cada componente que lo necesita
  ]
};
