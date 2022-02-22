import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent {
  @Input() fileName: string;
  @Output() confirmDelete = new EventEmitter();

  public onConfirmDelete(): void {
    this.confirmDelete.emit();
  }
}
