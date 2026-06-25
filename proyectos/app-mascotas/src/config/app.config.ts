import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { MascotasService } from '../services/mascotas/mascotas.service';
import { MascotasServiceImpl } from '../services/mascotas/mascotas.service.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    // Necesario para las animaciones de los componentes de Angular Material.
    provideAnimationsAsync(),
    // Cuando alguien pida un MascotasService, Angular le dará una instancia de MascotasServiceImpl.
    {
      provide: MascotasService,
      useClass: MascotasServiceImpl,
    },
  ],
};
