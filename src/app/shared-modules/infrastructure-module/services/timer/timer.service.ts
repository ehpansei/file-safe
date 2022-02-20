import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimerStatus } from '@infrastructure-module/enums/timer-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private _stopTimer = new Subject<TimerStatus>();

  public stop(): void {
    this._stopTimer.next(TimerStatus.stop);
  }

  public start(): void {
    this._stopTimer.next(TimerStatus.start);
  }

  public getStatus(): Observable<TimerStatus> {
    return this._stopTimer.asObservable();
  }
}
