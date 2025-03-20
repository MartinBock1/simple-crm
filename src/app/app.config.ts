import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'simple-crm-aae5e',
          appId: '1:471885741953:web:c2fe6c7b7cd2484ae37280',
          storageBucket: 'simple-crm-aae5e.firebasestorage.app',
          apiKey: 'AIzaSyBK2zvLDWDivgpiWiuziZUswjx59gEjA6U',
          authDomain: 'simple-crm-aae5e.firebaseapp.com',
          messagingSenderId: '471885741953',
        })
      )
    ),
    
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
