import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '@authentication-module/services/authentication.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public formGroup!: FormGroup;
  public isLoading = true;

  get usernameControl(): FormControl {
    return this.formGroup.get('username') as FormControl;
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
    console.log(this.formGroup.value);
    this.authenticationService.login(this.formGroup.value);
  }

  private initFormGroup(): void {
    this.formGroup = this.fb.group({
      username: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required])
    });
  }
}
