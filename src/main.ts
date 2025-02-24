import { ErrorHandler } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CustomErrorHandler } from './app/core/services/custom-error-handler.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { getApp } from 'firebase/app';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp({})),
    provideAppCheck(() => {
      const provider = new ReCaptchaV3Provider('xxxxxxxxxxxxxxxxxx');
      return initializeAppCheck(getApp(), { provider });
    }),
    // ErrorHandler is instantied eargerly at bootstrap, 
    { provide: ErrorHandler, useClass: CustomErrorHandler },
  ],
}).catch(err => console.error(err));

