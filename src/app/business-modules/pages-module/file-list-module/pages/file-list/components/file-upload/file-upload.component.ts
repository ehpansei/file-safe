import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SnackbarService } from '@infrastructure-module/services/snackbar/snackbar.service';
import { FileService } from '@file-list-module/services/file.service';
import { TimerService } from '@infrastructure-module/services/timer/timer.service';

@Component({
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() fileUploaded = new EventEmitter<boolean>();
  public fileName: string;
  public selectedFile: File;
  public isDragging: boolean;
  public isUploading: boolean;

  constructor(
    private fileService: FileService,
    private snackbarService: SnackbarService,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {}

  public onClickUpload(): void {
    if (this.selectedFile) {
      this.timerService.stop();
      // start separate observable that emits every x seconds until destroy
      // take this logic to the parent component
      this.fileService.create(this.selectedFile).subscribe({
        next: (resp: any) => {
          this.fileUploaded.emit(true);
          this.timerService.start();
          // show success toast
          this.snackbarService.success('File successfully uploaded');
        },
        error: (err) => {
          this.fileUploaded.emit(false);
          // show failure toast
          this.snackbarService.failure('File successfully uploaded');
        }
      });
    }
  }

  public onDragLeave(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = false;
    return;
  }

  public onDragOver(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = true;
    console.log('dragging over');
    return;
  }

  public onDrop(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = false;
    this.isUploading = true;
    return;
  }

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
  }
}
