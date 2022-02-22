import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { WithLoadingPipe } from './pipes/with-loading.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
