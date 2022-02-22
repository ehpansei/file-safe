import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent {
  @Output() confirmDelete = new EventEmitter();

  public onConfirmDelete(): void {
    this.confirmDelete.emit();
  }
}
