import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, } from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({timeOut : 1000, preventDuplicates : true}),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),provideHttpClient(withFetch()), 
    provideClientHydration(withEventReplay())]
};
