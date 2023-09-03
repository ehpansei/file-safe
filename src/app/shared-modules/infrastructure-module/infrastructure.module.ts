import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { WithLoadingPipe } from './pipes/with-loading.pipe';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

@NgModule({
  declarations: [WithLoadingPipe],
  imports: [MatDialogModule, MatButtonModule],
  exports: [
    CommonModule,
    MatButtonModule,
    WithLoadingPipe,
    MatProgressSpinnerModule
  ]
})
export class InfrastructureModule {}
