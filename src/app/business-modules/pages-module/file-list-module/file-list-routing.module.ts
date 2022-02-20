import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileDetailPage } from './pages/file-detail/file-detail.page';
import { FileListPage } from './pages/file-list/file-list.page';

const routes: Routes = [
  {
    path: '',
    component: FileListPage
  },
  { path: ':id', component: FileDetailPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileListRoutingModule {}
