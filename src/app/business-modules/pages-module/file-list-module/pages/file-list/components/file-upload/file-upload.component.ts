import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Output() fileUploaded = new EventEmitter<File>();
  public fileName: string;
  public selectedFile: File;
  public isDragging: boolean;
  public isUploading: boolean;

  public onClickUpload(): void {
    if (this.selectedFile) {
      this.fileUploaded.emit(this.selectedFile);
      this.isUploading = true;
    }
  }

  public onDragLeave(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = false;
  }

  public onDragOver(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = true;
  }

  public onDrop(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = false;
    this.selectedFile = event.dataTransfer.files[0];
  }

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
  }
}
