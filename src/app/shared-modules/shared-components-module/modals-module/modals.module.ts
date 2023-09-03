import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [ModalComponent, ConfirmDeleteDialogComponent],
  exports: [ModalComponent, ConfirmDeleteDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class ModalsModule {}
