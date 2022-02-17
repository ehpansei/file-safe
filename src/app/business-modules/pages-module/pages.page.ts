import { Component, HostListener, OnInit } from '@angular/core';
import { AuthenticationService } from '@authentication-module/services/authentication.service';

@Component({
  selector: 'app-page',
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

  private TIMEOUT = 30000000;
  private timer: NodeJS.Timeout;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.setLogoutTimer();
  }

  private setLogoutTimer(): void {
    this.timer = setTimeout(() => {
      this.authenticationService.logout();
    }, this.TIMEOUT);
  }

  private resetLogoutTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.setLogoutTimer();
  }
}
