import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SomeOtherPageComponent } from './pages/some-other-page/some-other-page.component';

const routes: Routes = [
  {
    path: '',
    component: SomeOtherPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SomeOtherModuleRoutingModule {}
