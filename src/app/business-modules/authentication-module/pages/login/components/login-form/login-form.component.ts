import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { finalize } from 'rxjs';
import { AppConfig } from 'src/configs/app.config';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public formGroup!: FormGroup;
  public isLoading = true;

  get emailControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.isLoading = false;
  }

  public onSubmit(): void {
    this.isLoading = true;
    this.authenticationService
      .login(this.formGroup.value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe();
  }

  private initFormGroup(): void {
    this.formGroup = this.fb.group({
      email: this.fb.control(null, [
        Validators.required,
        Validators.pattern(AppConfig.emails.regexFormat)
      ]),
      password: this.fb.control(null, [Validators.required])
    });
  }
}
