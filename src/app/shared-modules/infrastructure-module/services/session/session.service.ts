import { Injectable } from '@angular/core';
import {
  Observable,
  repeatWhen,
  Subject,
  Subscription,
  takeUntil,
  timer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();

  private subscriptions = new Subscription();

  constructor() {}

  public start(): Observable<any> {
    return timer(5000, 5000);
    /* .pipe(
      takeUntil(this._stop),
      repeatWhen(() => this._start)
    ); */
  }

  restart(): void {
    console.log("restart");
    this._start.next();
  }
  stop(): void {
    this._stop.next();
  }

  public unsubscribe(): void {
    this.subscriptions.unsubscribe();
  }
}
