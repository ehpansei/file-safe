import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackbarService } from '@app/shared-modules/infrastructure-module/services/snackbar/snackbar.service';
import { InfrastructureModule } from '@infrastructure-module/infrastructure.module';
import { of } from 'rxjs';
import { FileMock } from 'src/tests/model-mocks/file.mock';
import { FileList } from '../../models/file-list.model';
import { FileService } from '../../services/file.service';
import { FileServiceFilter } from '../../services/models/file-service-filter.model';
import { FileListItemComponent } from './components/file-list-item/file-list-item.component';
import { FileListToolbarComponent } from './components/file-list-toolbar/file-list-toolbar.component';

import { FileListPage } from './file-list.page';

describe('FileListPage', () => {
  let component: FileListPage;
  let fixture: ComponentFixture<FileListPage>;

  // service stubs
  let fileServiceStub: Partial<FileService>;
  let fileServiceFilter = new FileServiceFilter();
  let fileListMock = FileMock.fileList1;

  fileServiceStub = {
    list: (fileServiceFilter) => of(fileListMock)
  };
  let snackbarServiceStub: Partial<SnackbarService>;
  snackbarServiceStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        InfrastructureModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatGridListModule,
        MatIconModule
      ],
      providers: [
        { provide: FileService, useValue: fileServiceStub },
        { provide: SnackbarService, useValue: snackbarServiceStub }
      ],
      declarations: [
        FileListPage,
        FileListToolbarComponent,
        FileListItemComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
