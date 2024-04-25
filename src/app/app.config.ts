import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
