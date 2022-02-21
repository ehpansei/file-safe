import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: 'files',
    component: PagesPage,
    loadChildren: () =>
      import('./file-list-module/file-list.module').then(
        (mod) => mod.FileListModule
      )
  },
  {
    path: 'some-other-module',
    component: PagesPage,
    loadChildren: () =>
      import('./some-other-module/some-other-module.module').then(
        (mod) => mod.SomeOtherModuleModule
      )
  },
  {
    path: '',
    redirectTo: 'files'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
