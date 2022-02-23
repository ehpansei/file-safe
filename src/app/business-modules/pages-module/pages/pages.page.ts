import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from '@infrastructure-module/services/timer/timer.service';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { TimerStatus } from '@infrastructure-module/enums/timer-status.enum';
import { AppConfig } from 'src/configs/app.config';
import { Router } from '@angular/router';

@Component({
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss']
})
export class PagesPage implements OnInit, OnDestroy {
  // set host listeners
  @HostListener('window:keydown', ['$event'])
  @HostListener('click', ['$event'])
  handleKeyDown(event: any) {
    // reset timer for logout
    this.resetLogoutTimer();
  }

  private timer: NodeJS.Timeout;
  private subscriptions = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private timerService: TimerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setLogoutTimer();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onClickLogout(): void {
    this.authenticationService.logout().subscribe();
  }

  /**
   * Creates a new timer and listens to events comming from
   * file upload
   */
  private setLogoutTimer(): void {
    this.timer = setTimeout(() => {
      this.authenticationService.logout().subscribe();
    }, AppConfig.session.sessionTime);

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
