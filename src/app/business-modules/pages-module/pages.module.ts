import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PagesPage } from './pages/pages.page';
import { MatIconModule } from '@angular/material/icon';
import { SideNavLinksComponent } from './pages/components/side-nav-links/side-nav-links.component';

@NgModule({
  declarations: [PagesPage, SideNavLinksComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PagesModule {}
