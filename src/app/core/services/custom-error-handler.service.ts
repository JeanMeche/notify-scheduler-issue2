import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { AppCheck } from '@angular/fire/app-check';

@Injectable({ providedIn: 'root' })
export class CustomErrorHandler implements ErrorHandler {
  // This trigger a Circular DI error but error is being eaten by a Firebase try/catch
  // The error only becomes visible when using "Pause on caught exceptions"
  constructor(private appCheck: AppCheck) {}

  handleError(error: any): void {
    console.error('CustomErrorHandler', error);
  }
}

