import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Auth, authState, User, UserInfo } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';

// see for more info: https://github.com/Sapython/angularfire/blob/new_docs/docs/auth.md#authentication

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public authUser: User = null;
  public isFirstStateRetrieval: boolean = true;
  public authLoggedInAndOutInfo: {
    user: string;
    dateTime: Date;
  }[] = [];

  public attemptToSignInWithFacebookButNoEmail: boolean = false;

  public authentication$: Observable<User>;

  public isUserLoggedIn$: Observable<boolean>;

  private router: Router;

  constructor(
    private auth: Auth,
    private dialog: MatDialog,
  ) {
    this.isUserLoggedIn$ = authState(this.auth).pipe(map((state: User) => !!state));

    this.authentication$ = authState(this.auth);

    this.authentication$.subscribe((authUser: User) => {
      if (authUser) {
      } else {
      }

      this.authUser = authUser;

      // 20210810 added sign-in & register guard so we can show no-email message dialog when necessary
      if (!this.authUser && !this.isFirstStateRetrieval && !this.router.url.includes('sign-in') && !this.router.url.includes('register')) {
        if (this.attemptToSignInWithFacebookButNoEmail) {
          this.router.navigate(['no-email']);
        } else if (!this.router.url.includes('competition-registration') && !this.router.url.includes('live-competition')) {
          this.router.navigate(['home']);
        }
        this.dialog.closeAll();
      }
      this.isFirstStateRetrieval = false;

      this.authLoggedInAndOutInfo.push({ user: this.email ?? 'logged out', dateTime: new Date() });
    });
  }

  get email(): string {
    if (this.authUserInfo() && this.authUserInfo()[0]) return this.authUserInfo()[0].email;
    else return null;
  }

  get authenticated(): boolean {
    /* if (this.authState === null) {
      return null;
    }*/
    return this.authUser !== null;
  }

  get id(): string {
    return this.authenticated ? this.authUser.uid : '';
  }

  authUserInfo(): UserInfo[] {
    if (this.authUser) {
      return this.authUser.providerData;
    } else {
      return null;
    }
  }
}
