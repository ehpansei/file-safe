import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@app/shared-modules/infrastructure-module/services/authentication/authentication.service';
import { of } from 'rxjs';

import { FileListToolbarComponent } from './file-list-toolbar.component';

describe('FileListToolbarComponent', () => {
  let component: FileListToolbarComponent;
  let fixture: ComponentFixture<FileListToolbarComponent>;
  let authenticationServiceStub: Partial<AuthenticationService>;

  authenticationServiceStub = {
    logout: () => {
      return of(false);
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatInputModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ],
      declarations: [FileListToolbarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
