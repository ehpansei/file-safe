import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfrastructureModule } from '@infrastructure-module/infrastructure.module';

import { FileListPage } from './file-list.page';

describe('FileListPage', () => {
  let component: FileListPage;
  let fixture: ComponentFixture<FileListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfrastructureModule],
      declarations: [FileListPage]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
