import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() fileUploaded = new EventEmitter<File>();
  public fileName: string;
  private selectedFile: File;

  constructor() {}

  ngOnInit(): void {}

  public onClickUpload(): void {
    console.log('clicked upload');
    this.fileUploaded.emit(this.selectedFile);
  }

  public onFileSelected(event: any): void {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    }
  }
}
