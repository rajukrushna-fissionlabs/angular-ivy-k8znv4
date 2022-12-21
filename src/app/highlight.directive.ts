import {
  Directive,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  timeCounter: number = 0;
  timerRef: any;
  idleState = 'NOT_STARTED';

  constructor(private idle: Idle, cd: ChangeDetectorRef) {
    // set idle parameters
    idle.setIdle(5); // how long can they be inactive before considered idle, in seconds
    idle.setTimeout(5); // how long can they be idle before considered timed out, in seconds
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

    // do something when the user becomes idle
    idle.onIdleStart.subscribe(() => {
      this.idleState = 'IDLE';
      console.log(this.idleState);
    });
    // do something when the user is no longer idle
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NOT_IDLE';
      console.log(`${this.idleState} ${new Date()}`);
      cd.detectChanges(); // how do i avoid this kludge?
    });
    // do something when the user has timed out
    idle.onTimeout.subscribe(() => (this.idleState = 'TIMED_OUT'));
  }

  ngOnInit() {
    this.reset();
    this.startTimer();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
    });
  }

  startTimer() {
    console.log('timer: ', this.timeCounter.toString());
    const startTime = Date.now() - this.timeCounter * 1000;
    this.timerRef = setInterval(() => {
      this.timeCounter = Math.round((Date.now() - startTime) / 1000);
      console.log(this.timeCounter);
    }, 1000);
  }

  stopTimer() {
    console.log('timer paused at: ', this.timeCounter.toString());
    clearInterval(this.timerRef);
  }

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = 'NOT_IDLE';
  }
}
