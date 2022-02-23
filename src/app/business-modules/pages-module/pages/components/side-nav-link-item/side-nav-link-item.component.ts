import { Component, Input } from '@angular/core';
import { SideNavLink } from '@pages-module/pages/models/side-nav-link.model';

@Component({
  selector: 'app-side-nav-link-item',
  templateUrl: './side-nav-link-item.component.html',
  styleUrls: ['./side-nav-link-item.component.scss']
})
export class SideNavLinkItemComponent {
  @Input() config: SideNavLink;
}
