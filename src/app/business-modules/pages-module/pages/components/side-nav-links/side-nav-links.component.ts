import { Component } from '@angular/core';
import { SideNavLink } from '../../models/side-nav-link.model';

@Component({
  selector: 'side-nav-links',
  templateUrl: './side-nav-links.component.html',
  styleUrls: ['./side-nav-links.component.scss'],
  host: { class: 'c-sideNavLinks' }
})
export class SideNavLinksComponent {
  public urls: SideNavLink[] = [
    {
      name: 'Files',
      url: '/files'
    },
    {
      name: 'Some other module',
      url: '/some-other-module'
    }
  ];
}
