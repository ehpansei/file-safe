import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { File } from '@file-list-module/models/file.model';
import { FileService } from '@file-list-module/services/file.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@Component({
  templateUrl: './file-list.page.html',
  styleUrls: ['./file-list.page.scss']
})
export class FileListPage implements OnInit {
  public fileList$: Observable<File[]>;

  constructor(public dialog: MatDialog, private fileService: FileService) {}

  ngOnInit(): void {
    this.fileList$ = this.fileService.get();
  }

  public onClickUploadFile(): void {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '250px'
    });

    dialogRef.componentInstance.fileUploaded.subscribe((file: File) => {
      this.fileService.create(file).subscribe((resp: boolean) => {
        this.fileList$ = this.fileService.get();
      });
    });
  }

  public onDeleteFile(index: number): void {
    this.fileService.delete(index);
  }
}
