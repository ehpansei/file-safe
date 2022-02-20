import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly SNACKBAR_DURATION_MS = 2000;

  constructor(private snackBar: MatSnackBar) {}

  public success(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: this.SNACKBAR_DURATION_MS,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  public failure(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: this.SNACKBAR_DURATION_MS,
      panelClass: ['failure-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
