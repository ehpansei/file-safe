import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SomeOtherModuleRoutingModule } from './some-other-module-routing.module';
import { SomeOtherPageComponent } from './pages/some-other-page/some-other-page.component';


@NgModule({
  declarations: [
    SomeOtherPageComponent
  ],
  imports: [
    CommonModule,
    SomeOtherModuleRoutingModule
  ]
})
export class SomeOtherModuleModule { }
