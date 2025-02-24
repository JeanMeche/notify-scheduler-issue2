import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, isDevMode, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'alert-dialog',
  styleUrls: ['alert-dialog.style.scss'],
  template: `
    <div id="alert-dialog-title-container" class="left-align-dialog-title">
      <mat-icon>report</mat-icon>
      <h3>Something went wrong!</h3>
    </div>
    <!-- *ngIf="title==''"-->
    <!--<h3 *ngIf="title!=''">{{values.title}}</h3>-->
    <div id="message-container" class="dialog-content-container add-overflow">
      @if (!error?.title) {
        <p>It seems like something went wrong on the way!</p>
      }
      @if (messageError) {
        <p style="margin: 0px">The technical message of the error is:</p>
      }
      @if (messageError) {
        <p style="font-weight: bold; margin-top: 0px">{{ messageError }}</p>
      }
      <p>
        If this error keeps happening, please report it as a bug, so we can keep improving our application. <br />
        More information about
        <a class="default-link" href="/manual/general/reporting_bugs" target="_blank">how to report bugs can be found</a>.
      </p>
      @if (!showDetails) {
        <a class="default-link" (click)="showDetails = true"> Click here to see the details of the error </a>
      }
      @if (showDetails) {
        <p>The details of the error are:</p>
      }
      @if (showDetails) {
        <p class="add-overflow error-details">{{ detailedError }}</p>
      }
      <!--<p *ngIf="error?.title">error.title</p>-->
      <!--          <p *ngIf="messageError" style="margin:0px;width:440px;word-wrap: break-word">The technical message of the error is:</p>-->
      <!--          <div *ngIf="messageError">-->
      <!--            <strong>{{ messageError }}</strong>-->
      <!--          </div>-->
      <!--<p *ngIf="'true'" style="margin:0px;width:440px;word-wrap: break-word">No technical message of the error is available.</p>-->
      <!--          <p style="margin:0px">Remember that we're still very actively improving on the application.</p>-->
      <!--<p style="margin:0px">It is possible your browser has opened an older version of the application.</p>-->
      <!--<p style="margin:0px">Please do a hard refresh (click on Ctlr + F5) to be sure that you are running the latest-->
      <!--version.</p>-->
      <!--<p style="margin:0px">You can e-mail us on: <a class="default-link" href="mailto:support@acro-companion.com?subject=Acro Companion.">support@acro-companion.com</a>.</p>-->
      <!--          <p>Please do a refresh of the browser tab to continue.</p>-->
      <!--<li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>-->
      <!--<li><strong>Close:</strong> click on the button below to close the modal.</li>-->
      <!--<button *ngIf="showOkButton" class="md-close">Close me!</button>-->
    </div>
    <div class="dialog-buttons-container">
      @if (enableContinue) {
        <button matDialogClose mat-raised-button color="primary">Continue</button>
      }
    </div>
  `,
  imports: [MatIcon, MatDialogClose, MatButton],
})
export class AlertDialog {
  error: any; // is type Error but otherwise won't let some properties through in the template
  showDetails: boolean = false;
  enableContinue: boolean;

  messageError: string;
  detailedError: string;

  // showOkButton:boolean;
  // title:string;
  // text:string;

  // @Output() clickedOk: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    public dialogRef: MatDialogRef<AlertDialog>,
    private cdr: ChangeDetectorRef,
  ) {
    setTimeout(() => {
      this.cdr.detach();
      this.cdr.reattach();
      this.cdr.detectChanges();
      this.cdr.markForCheck();
    }, 1);
  }

  ngOnInit(): void {
    // this.helpers.log("ALERT-DIALOG-OPENED");
    // this.values = this.dialogData;
    this.error = this.dialogData.error;
    this.enableContinue = isDevMode();
    // console.log(this.error);

    if (this.error.rejection && this.error.rejection.message) {
      this.messageError = this.error.rejection.message;
    } else if (this.error.message) {
      this.messageError = this.error.message;
    }
    if (this.messageError.length > 100) this.messageError = this.messageError.substring(0, 100) + '...';

    if (this.error.stack) {
      this.detailedError = this.error.stack;
    }
  }
}
