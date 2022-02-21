import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavLinksComponent } from './side-nav-links.component';

describe('SideNavLinksComponent', () => {
  let component: SideNavLinksComponent;
  let fixture: ComponentFixture<SideNavLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
