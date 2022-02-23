import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TimerStatus } from '@app/shared-modules/infrastructure-module/enums/timer-status.enum';
import { AuthenticationService } from '@app/shared-modules/infrastructure-module/services/authentication/authentication.service';
import { TimerService } from '@app/shared-modules/infrastructure-module/services/timer/timer.service';
import { of } from 'rxjs';
import { SideNavLinkItemComponent } from './components/side-nav-link-item/side-nav-link-item.component';
import { SideNavLinksComponent } from './components/side-nav-links/side-nav-links.component';
import { NotFoundPage } from './not-found/not-found.page';

import { PagesPage } from './pages.page';

describe('PagesPage', () => {
  let component: PagesPage;
  let fixture: ComponentFixture<PagesPage>;

  // service stubs
  let timerServiceStub: Partial<TimerService>;
  timerServiceStub = {
    getStatus: () => of(TimerStatus.start)
  };
  let authenticationServiceStub: Partial<AuthenticationService>;
  authenticationServiceStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [
        PagesPage,
        SideNavLinksComponent,
        SideNavLinkItemComponent
      ],
      providers: [
        { provide: TimerService, useValue: timerServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
