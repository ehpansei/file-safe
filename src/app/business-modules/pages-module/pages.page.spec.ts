import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PagesPage } from './pages.page';

describe('PagesPage', () => {
  let component: PagesPage;
  let fixture: ComponentFixture<PagesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PagesPage]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
