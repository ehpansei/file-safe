import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@app/shared-modules/infrastructure-module/services/authentication/authentication.service';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authenticationServiceStub: Partial<AuthenticationService>;
  let loginForm: DebugElement;
  authenticationServiceStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatButtonModule,
        MatInputModule
      ],
      declarations: [LoginPage, LoginFormComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loginForm = fixture.debugElement.query(By.css('#loginForm'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login form component', () => {
    expect(loginForm).toBeTruthy();
  });
});
