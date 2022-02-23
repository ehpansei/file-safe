import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPage } from './not-found.page';

describe('NotFoundComponent', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundPage]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an h1 element with text "Page not found!"', () => {
    h1 = fixture.nativeElement.querySelector('h1');

    expect(h1.textContent).toContain('Page not found!');
  });
});
