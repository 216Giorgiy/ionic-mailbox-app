import {Component, ElementRef, ViewChild} from "@angular/core";
import {ModalController} from 'ionic-angular';

import {ArchivedInbox} from './archived-inbox';
import {SnoozedInbox} from './snoozed-inbox';
import {UnreadInbox} from './unread-inbox';

import {ComposeView} from '../compose/compose-view';

import {PressGestureController} from '../../utils/gestures/press-gesture';

@Component({
  directives: [ArchivedInbox, SnoozedInbox, UnreadInbox],
  template:`
  <ion-header>
    <ion-navbar no-border-bottom>
      <ion-segment primary padding [ngModel]="activeSegment" (ngModelChange)="activeSegmentChanged($event)">
        <ion-segment-button value="snoozed" class="small-seg-btn">
          <ion-icon name="time"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="inbox" class="small-seg-btn">
          <ion-icon name="mail"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="archived" class="small-seg-btn">
          <ion-icon name="checkmark-circle"></ion-icon>
        </ion-segment-button>
      </ion-segment>
      <ion-buttons end *ngIf="activeSegment === 'inbox' && reorderEnabled">
        <button (click)="disableReorder()" primary>Done</button>
      </ion-buttons>
      <ion-buttons end *ngIf="activeSegment === 'inbox' && !reorderEnabled">
        <button (click)="openCompose()" primary>
          <ion-icon ios="ios-create-outline" md="md-create"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>
  </ion-header>
  <ion-content [ngSwitch]="activeSegment" #content>
    <snoozed-inbox *ngSwitchCase="'snoozed'">Snoozed</snoozed-inbox>
    <unread-inbox *ngSwitchCase="'inbox'" [reorderEnabled]="reorderEnabled"></unread-inbox>
    <archived-inbox *ngSwitchCase="'archived'"></archived-inbox>
  </ion-content>
  `
})
export class InboxPage{

  @ViewChild('content', {read: ElementRef}) content: ElementRef;
  private activeSegment: string;
  private reorderEnabled: boolean;

  constructor(private modalController: ModalController, private pressGestureController: PressGestureController){
      this.activeSegment = 'inbox';
  }

  disableReorder(){
    this.reorderEnabled = false;
  }

  activeSegmentChanged(newActiveSegment: string){
    this.disableReorder();
    this.activeSegment = newActiveSegment;
  }

  ionViewDidEnter(){
    let gesture = this.pressGestureController.create(this.content, {});
    gesture.onPress( (event) => {
      if ( this.activeSegment === 'inbox' ) {
        this.reorderEnabled = true;
      }
    });
  }

  openCompose(){
    let modal = this.modalController.create(ComposeView);
    modal.present();
  }
}
