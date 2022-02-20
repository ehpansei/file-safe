import { NgModule } from '@angular/core';

import { FileListRoutingModule } from './file-list-routing.module';
import { FileListPage } from './pages/file-list/file-list.page';
import { MatGridListModule } from '@angular/material/grid-list';
import { FileService } from './services/file.service';
import { InfrastructureModule } from '@infrastructure-module/infrastructure.module';
import { FileUploadComponent } from './pages/file-list/components/file-upload/file-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { FileListItemComponent } from './pages/file-list/components/file-list-item/file-list-item.component';
import { FileDetailPage } from './pages/file-detail/file-detail.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    FileListPage,
    FileDetailPage,
    FileUploadComponent,
    FileListItemComponent
  ],
  imports: [
    InfrastructureModule,
    FileListRoutingModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [FileService]
})
export class FileListModule {}
