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
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { FileListToolbarComponent } from './pages/file-list/components/file-list-toolbar/file-list-toolbar.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
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
