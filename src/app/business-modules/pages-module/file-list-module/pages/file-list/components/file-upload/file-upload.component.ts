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
    return;
  }

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
  }
}
