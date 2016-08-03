import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  template: `
  <ion-content class="transparent">
    <div class="compose-wrapper">
      <div class="compose-content">
        <ion-toolbar>
          <ion-buttons start>
            <button (click)="dismiss()" showWhen="ios">Cancel</button>
            <button (click)="dismiss()" hideWhen="ios">
              <ion-icon name="close"></ion-icon>
            </button>
          </ion-buttons>
          <ion-title>New Message</ion-title>
          <ion-buttons end>
            <button (click)="dismiss()" showWhen="ios">Send</button>
            <button (click)="dismiss()" hideWhen="ios">
              <ion-icon name="send"></ion-icon>
            </button>
          </ion-buttons>
        </ion-toolbar>
        <ion-item>
          <ion-label floating>To:</ion-label>
          <ion-input type="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>Subject:</ion-label>
          <ion-input type="text"></ion-input>
        </ion-item>
        <ion-textarea [(ngModel)]="body" padding></ion-textarea>
      </div>
    </div>

  </ion-content>
  `
})
export class ComposeView {

  private body: string;

  constructor(private viewController: ViewController) {
    this.body = '\n\nSent from Ionic Mailbox';
  }

  dismiss() {
    this.viewController.dismiss();
  }
}
