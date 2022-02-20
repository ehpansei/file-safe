import { Component, HostListener, OnInit } from '@angular/core';
import { TimerService } from '@infrastructure-module/services/timer/timer.service';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { TimerStatus } from '@infrastructure-module/enums/timer-status.enum';

@Component({
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss']
})
export class PagesPage implements OnInit {
  // set host listeners
  @HostListener('window:keydown', ['$event'])
  @HostListener('click', ['$event'])
  handleKeyDown(event: any) {
    // reset timer for logout
    this.resetLogoutTimer();
  }

  // 5 minutes
  private TIMEOUT = 300000;
  private timer: NodeJS.Timeout;
  private subscriptions = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.setLogoutTimer();
    this.subscribeTimerStatus();
  }

  private subscribeTimerStatus(): void {
    this.subscriptions.add(
      this.timerService.getStatus().subscribe((status: TimerStatus) => {
        switch (status) {
          case TimerStatus.stop:
            this.stopLogoutTimer();
            break;
          case TimerStatus.start:
            this.resetLogoutTimer();
            break;
          default:
            break;
        }
      })
    );
  }

  private setLogoutTimer(): void {
    this.timer = setTimeout(() => {
      this.authenticationService.logout().subscribe();
    }, this.TIMEOUT);
  }

  private resetLogoutTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.setLogoutTimer();
  }

  private stopLogoutTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
