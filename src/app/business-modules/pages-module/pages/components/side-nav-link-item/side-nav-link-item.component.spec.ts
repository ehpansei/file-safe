import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavLinkItemComponent } from './side-nav-link-item.component';

describe('SideNavLinkItemComponent', () => {
  let component: SideNavLinkItemComponent;
  let fixture: ComponentFixture<SideNavLinkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavLinkItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavLinkItemComponent);
    component = fixture.componentInstance;
    component.config = { name: 'Files', url: './files' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
