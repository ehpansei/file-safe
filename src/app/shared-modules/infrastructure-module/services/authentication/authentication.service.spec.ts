import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnackbarService } from '../snackbar/snackbar.service';
import { WithLoadingPipe } from '../../pipes/with-loading.pipe';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let snackbarServiceStub: Partial<SnackbarService>;
  snackbarServiceStub = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: SnackbarService, useValue: snackbarServiceStub }],
      declarations: [WithLoadingPipe]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
