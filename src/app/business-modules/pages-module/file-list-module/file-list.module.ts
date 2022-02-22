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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileListToolbarComponent } from './pages/file-list/components/file-list-toolbar/file-list-toolbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ModalsModule } from '@app/shared-modules/shared-components-module/modals-module/modals.module';

@NgModule({
  declarations: [
    FileListPage,
    FileDetailPage,
    FileUploadComponent,
    FileListItemComponent,
    FileListToolbarComponent
  ],
  imports: [
    InfrastructureModule,
    ModalsModule,
    FileListRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    ScrollingModule
  ],
  providers: [FileService]
})
export class FileListModule {}
