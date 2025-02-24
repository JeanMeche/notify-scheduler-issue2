import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AlertDialog } from '../../generic-components/alert-dialog/alert-dialog.component';
import { UserService } from './data-model-services/user.service';
import { AppCheck } from '@angular/fire/app-check';

@Injectable({ providedIn: 'root' })
export class CustomErrorHandler extends ErrorHandler {
  userService: UserService;

  constructor(
    public injector: Injector,
    public dialog: MatDialog,
    private zone: NgZone,
    private appCheck: AppCheck,
  ) {
    super();
    setTimeout(() => {
      this.userService = injector.get(UserService);
    });
  }

  errorDialogRef: MatDialogRef<AlertDialog> = null;

  showError(error: Error): void {
    if (!this.errorDialogRef) {
      // necessary to run in the angular zone to trigger change detection when the dialog appears so the dialog component template is interpolated/change-detected
      this.zone.run(() => {
        let config: MatDialogConfig = {
          data: { error: error },
          autoFocus: false,
        } as MatDialogConfig;

        this.errorDialogRef = this.dialog.open(AlertDialog, config);
        this.errorDialogRef.afterClosed().subscribe(result => {
          this.errorDialogRef = null;
        });
      });
    }
  }

  // I handle the given error.
  async handleError(error: Error): Promise<void> {
    super.handleError(error);
    this.showError(error);
  }
}
