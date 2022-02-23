import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SideNavLinkItemComponent } from './side-nav-link-item.component';

describe('SideNavLinkItemComponent', () => {
  let component: SideNavLinkItemComponent;
  let fixture: ComponentFixture<SideNavLinkItemComponent>;
  let anchor: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavLinkItemComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavLinkItemComponent);
    component = fixture.componentInstance;
    component.config = { name: 'Files', url: '/files' };
    fixture.detectChanges();
    anchor = fixture.nativeElement.querySelector('a');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an anchor with href and text equal to given configuration', () => {
    expect(anchor.textContent).toContain(component.config.name);
  });

  it('should create an anchor with href and text equal to given configuration', () => {
    expect(anchor.getAttribute('href')).toContain(component.config.url);
  });
});
