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
    provideHttpClient()
  ]
};
