import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WithLoadingPipe } from '@app/shared-modules/infrastructure-module/pipes/with-loading.pipe';
import { of } from 'rxjs';
import { FileMock } from 'src/tests/model-mocks/file.mock';
import { FileService } from '../../services/file.service';

import { FileDetailPage } from './file-detail.page';

describe('FileDetailPage', () => {
  let component: FileDetailPage;
  let fixture: ComponentFixture<FileDetailPage>;
  let fileServiceStub: Partial<FileService>;

  fileServiceStub = {
    get: () => of(FileMock.file1)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FileDetailPage, WithLoadingPipe],
      providers: [{ provide: FileService, useValue: fileServiceStub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
