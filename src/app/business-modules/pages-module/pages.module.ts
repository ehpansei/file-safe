import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PagesPage } from './pages/pages.page';

@NgModule({
  declarations: [PagesPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class PagesModule {}
