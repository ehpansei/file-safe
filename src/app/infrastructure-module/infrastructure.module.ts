import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [MatDialogModule, MatButtonModule],
  exports: [CommonModule, MatButtonModule, ModalComponent]
})
export class InfrastructureModule {}
