import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
