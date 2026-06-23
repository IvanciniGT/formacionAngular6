import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './config/app.config';
import { App } from './components/app/app';

bootstrapApplication(App, appConfig)      // Angular, arranca TU mi aplicación, con una configuración que te paso.
                                            // INVERSION DE CONTROL !!!!
  .catch((err) => console.error(err));    // Si hay un error, lo muestras en la consola
