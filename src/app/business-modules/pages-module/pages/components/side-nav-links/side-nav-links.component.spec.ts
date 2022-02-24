import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavLinkItemComponent } from '../side-nav-link-item/side-nav-link-item.component';

import { SideNavLinksComponent } from './side-nav-links.component';

describe('SideNavLinksComponent', () => {
  let component: SideNavLinksComponent;
  let fixture: ComponentFixture<SideNavLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SideNavLinksComponent, SideNavLinkItemComponent]
    }).compileComponents();
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
