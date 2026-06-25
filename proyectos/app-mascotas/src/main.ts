import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './config/app.config';
import { App } from './components/app/app';

// Arrancamos la aplicación standalone usando el componente raíz App y la configuración appConfig.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
