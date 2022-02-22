import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginCredentials } from '@app/shared-modules/infrastructure-module/models/login-credentials.model';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { of } from 'rxjs';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let emailField: DebugElement;
  let emailErrorRequired: DebugElement;
  let emailErrorPattern: DebugElement;
  let passwordField: DebugElement;
  let passwordError: DebugElement;
  let submitButton: DebugElement;
  let form: DebugElement;

  let authenticationServiceStub: Partial<AuthenticationService>;
  // submit form trigger helper
  let submit = (form: any) => {
    form.triggerEventHandler('submit', null);
  };

  authenticationServiceStub = {
    login: (credentials: LoginCredentials) => {
      return of(true);
    },
    logout: () => {
      return of(false);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ],
      declarations: [LoginFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();

    emailField = fixture.debugElement.query(By.css('#emailField'));
    passwordField = fixture.debugElement.query(By.css('#passwordField'));
    submitButton = fixture.debugElement.query(By.css('button'));
    form = fixture.debugElement.query(By.css('form'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render username and password input fields and submit button', () => {
    expect(emailField).toBeTruthy();

    expect(passwordField).toBeTruthy();

    expect(submitButton).toBeTruthy();
  });

  it('should render username error when username field is empty', () => {
    // set formControl values
    component.formGroup.controls.email.setValue(null);
    component.formGroup.controls.password.setValue('password');

    submit(form);

    fixture.detectChanges();
    emailErrorRequired = fixture.debugElement.query(By.css('#emailErrorRequired'));

    expect(emailErrorRequired).toBeTruthy();
  });

  it('should render password error when password field is empty', () => {
    // set formControl values
    component.formGroup.controls.email.setValue('username');
    component.formGroup.controls.password.setValue(null);

    submit(form);

    fixture.detectChanges();
    passwordError = fixture.debugElement.query(By.css('#passwordError'));

    expect(passwordError).toBeTruthy();
  });

  it('submit button click should trigger submit method once', () => {
    // spy onSubmit
    const spyOnSubmit = spyOn(component, 'onSubmit');

    submit(form);

    expect(spyOnSubmit).toHaveBeenCalledTimes(1);
  });
});
