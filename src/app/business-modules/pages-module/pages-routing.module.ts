import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesPage } from './pages/pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children: [
      {
        path: 'files',
        loadChildren: () =>
          import('./file-list-module/file-list.module').then(
            (mod) => mod.FileListModule
          )
      },
      {
        path: 'some-other-module',
        loadChildren: () =>
          import('./some-other-module/some-other-module.module').then(
            (mod) => mod.SomeOtherModuleModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
