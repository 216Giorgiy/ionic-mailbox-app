import { Component, ContentChildren, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { App, Alert, Animation, NavController } from 'ionic-angular';

import { EmailDataProvider, Email } from './email-data-provider';


@Component({
  selector: 'snoozed-inbox',
  template: `
  <ion-list>
    <button ion-item detail-none *ngFor="let email of emails" (click)="favorite(email)">
      <ion-icon ios="ios-star-outline" md="ios-star-outline" item-left *ngIf="!email.favorited" primary></ion-icon>
      <ion-icon class="yellow" ios="ios-star" md="ios-star" item-left *ngIf="email.favorited"></ion-icon>
      <p text-right class="snooze-color"><span><ion-icon name="alarm" class="snoozed-small-icon"></ion-icon>{{getFormattedDate(email)}}</span></p>
      <p>{{email.sender}}</p>
      <h2>{{email.subject}}</h2>
      <p>{{email.body}}</p>
    </button>
  </ion-list>
  `
})
export class SnoozedInbox {

  private emails: Email[];

  constructor(private app: App, private emailDataProvider: EmailDataProvider, private nav: NavController) {
    this.loadSnoozedEmails();
  }

  loadSnoozedEmails() {
    this.emails = this.emailDataProvider.getSnoozedEmails();
  }

  favorite(email: Email) {
    email.favorited = !email.favorited;
  }

  getFormattedDate(email: Email): string {
    return email.snoozedUntilDate.format('dddd mmm ddS, h:MM:ss TT');
  }
}
