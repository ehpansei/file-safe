import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SnackbarService } from '@app/shared-modules/infrastructure-module/services/snackbar/snackbar.service';

import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;
  let snackbarServiceStub: Partial<SnackbarService>;
  snackbarServiceStub = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: SnackbarService, useValue: snackbarServiceStub }]
    });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
