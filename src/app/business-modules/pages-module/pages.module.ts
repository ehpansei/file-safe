import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesPage } from './pages.page';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [PagesPage],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PagesRoutingModule,
    MatSidenavModule,

  ]
})
export class PagesModule {}
