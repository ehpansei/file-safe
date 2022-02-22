import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TimerStatus } from '@app/shared-modules/infrastructure-module/enums/timer-status.enum';
import { AuthenticationService } from '@app/shared-modules/infrastructure-module/services/authentication/authentication.service';
import { TimerService } from '@app/shared-modules/infrastructure-module/services/timer/timer.service';
import { of } from 'rxjs';

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
      imports: [RouterTestingModule],
      declarations: [PagesPage],
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
