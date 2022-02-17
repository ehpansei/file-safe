import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileListPage } from './pages/file-list/file-list.page';

const routes: Routes = [
  {
    path: '',
    component: FileListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileListRoutingModule {}
