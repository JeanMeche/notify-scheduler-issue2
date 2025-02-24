import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private authenticationService: AuthenticationService) {}
}
