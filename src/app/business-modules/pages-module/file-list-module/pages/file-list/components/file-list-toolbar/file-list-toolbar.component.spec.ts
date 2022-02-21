import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListToolbarComponent } from './file-list-toolbar.component';

describe('FileListToolbarComponent', () => {
  let component: FileListToolbarComponent;
  let fixture: ComponentFixture<FileListToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileListToolbarComponent ]
    })
    .compileComponents();
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
