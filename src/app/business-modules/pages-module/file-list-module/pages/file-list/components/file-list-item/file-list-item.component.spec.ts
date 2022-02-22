import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileMock } from 'src/tests/model-mocks/file.mock';

import { FileListItemComponent } from './file-list-item.component';

describe('FileListItemComponent', () => {
  let component: FileListItemComponent;
  let fixture: ComponentFixture<FileListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileListItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListItemComponent);
    component = fixture.componentInstance;
    component.file = FileMock.file1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
