import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiService } from './services/api.service';
import { LoginService } from './services/login.service';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    AuthGuard,
    ApiService,
    LoginService
  ]
};
