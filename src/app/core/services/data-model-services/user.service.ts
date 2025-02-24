import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FirestoreService } from '../firestore.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private authenticationService: AuthenticationService,
    private firestoreService: FirestoreService,
  ) {}
}
