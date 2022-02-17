import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'files',
    loadChildren: () =>
      import('./file-list-module/file-list.module').then(
        (mod) => mod.FileListModule
      ),
  },
  {
    path: '',
    redirectTo: 'files',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
