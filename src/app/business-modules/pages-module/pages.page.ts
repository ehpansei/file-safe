import { Component, HostListener, OnInit } from '@angular/core';
import { TimerService } from '@infrastructure-module/services/timer/timer.service';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { debounceTime, Subscription } from 'rxjs';
import { TimerStatus } from '@infrastructure-module/enums/timer-status.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConfig } from 'src/configs/app.config';

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

  public searchFormGroup: FormGroup;

  // 5 minutes
  private TIMEOUT = 300000;
  private timer: NodeJS.Timeout;
  private subscriptions = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private timerService: TimerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setLogoutTimer();
    this.initSearch();
  }

  public onClickUploadFile(): void {}

  private initSearch(): void {
    this.initSearchForm();
    this.initSearchFormChangeSubscription();
  }

  private initSearchForm(): void {
    this.searchFormGroup = this.fb.group({
      term: this.fb.control(null)
    });
  }

  private initSearchFormChangeSubscription(): void {
    this.subscriptions.add(
      this.searchFormGroup.controls.term.valueChanges
        .pipe(debounceTime(AppConfig.config.searchDebounceTime))
        .subscribe((term: string) => {
          console.log(term);
          // this.fileList$ = this.fileService.list({ term });
        })
    );
  }

  private setLogoutTimer(): void {
    this.timer = setTimeout(() => {
      this.authenticationService.logout().subscribe();
    }, this.TIMEOUT);

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
