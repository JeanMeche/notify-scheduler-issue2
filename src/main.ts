import { ErrorHandler } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CustomErrorHandler } from './app/core/services/custom-error-handler.service';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { getApp } from 'firebase/app';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'xxxxxxxxxxxxxxxxx',
        authDomain: 'xxxxxxxxxxxxxxxxx',
        databaseURL: 'xxxxxxxxxxxxxxxxx',
        projectId: 'xxxxxxxxxxxxxxxxx',
        storageBucket: 'xxxxxxxxxxxxxxxxx',
        messagingSenderId: 'xxxxxxxxxxxxxxxxx',
        appId: 'xxxxxxxxxxxxxxxxx',
      }),
    ),
    provideAuth(() => getAuth(getApp())),
    provideAppCheck(() => {
      const provider = new ReCaptchaV3Provider('xxxxxxxxxxxxxxxxxx');
      return initializeAppCheck(getApp(), {
        provider,
      });
    }),
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch(err => console.error(err));

declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: string;
}
