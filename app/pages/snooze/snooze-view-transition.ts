import { ElementRef } from '@angular/core';
import { Animation, Transition, TransitionOptions, ViewController } from 'ionic-angular';

import { SUGGESTED_VELOCITY } from '../inbox/inbox-item-wrapper';

export const TRANSITION_IN_KEY: string = 'snoozeViewEnter';
export const TRANSITION_OUT_KEY: string = 'snoozeViewLeave';

export class SnoozeSlideInTransition extends Transition {
  constructor(enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions) {
    super(enteringView, leavingView, opts);

    // DOM READS
    let ele = <HTMLElement> enteringView.pageRef().nativeElement;
    let backdrop = ele.querySelector('ion-backdrop');
    let wrapper = ele.querySelector('.snooze-wrapper');
    let backdropAnimation = new Animation(backdrop);
    let wrapperAnimation = new Animation(wrapper);

    backdropAnimation.fromTo('opacity', '0.01', '0.8');
    wrapperAnimation.fromTo('translateX', `-100%`, `0%`);

    this
      .element(enteringView.pageRef())
      .easing('ease')
      .duration(250)
      .before.addClass('show-page')
      .add(backdropAnimation)
      .add(wrapperAnimation);
  }
}
export class SnoozeSlideOutTransition extends Transition {
  constructor(enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions) {
    super(enteringView, leavingView, opts);


    // DOM reads
    let ele = leavingView.pageRef().nativeElement;
    let backdrop = ele.querySelector('ion-backdrop');
    let wrapper = ele.querySelector('.snooze-wrapper');
    let swipedCell = document.querySelector('.right-cell.active.short');
    let backdropAnimation = new Animation(backdrop);
    let wrapperAnimation = new Animation(wrapper);
    let swipeAnimation = new Animation(swipedCell);

    backdropAnimation.fromTo('opacity', `${backdrop.style.opacity}`, '0.01');
    wrapperAnimation.fromTo('translateX', `0%`, `100%`);
    swipeAnimation.fromTo('translateX', `${0}px`, `-100%`);

    swipeAnimation.after.removeClass('active');
    swipeAnimation.after.removeClass('short');

    let distance = wrapper.clientWidth;
    let duration = distance / SUGGESTED_VELOCITY;

    this.element(leavingView.pageRef())
      .easing('ease')
      .duration(duration)
      .add(backdropAnimation)
      .add(wrapperAnimation)
      .add(swipeAnimation);
  }
}

Transition.register(TRANSITION_IN_KEY, SnoozeSlideInTransition);
Transition.register(TRANSITION_OUT_KEY, SnoozeSlideOutTransition);
