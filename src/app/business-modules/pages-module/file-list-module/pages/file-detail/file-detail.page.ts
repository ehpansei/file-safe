import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { File as FileModel } from '@file-list-module/models/file.model';
import { FileService } from '@file-list-module/services/file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.page.html',
  styleUrls: ['./file-detail.page.scss']
})
export class FileDetailPage implements OnInit {
  public file$: Observable<FileModel>;
  public downloadUrl: string;
  private fileId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.fileId = this.activatedRoute.snapshot.params.id;
    this.downloadUrl = environment.api.base + `files/${this.fileId}/download`;

    this.getData();
  }

  public onClickDownload(file: FileModel) {
    this.fileService.download(this.fileId).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const blobAnchor = window.document.createElement('a');

      blobAnchor.onload = () => {
        window.URL.revokeObjectURL(blobAnchor.href);
      };

      blobAnchor.href = url;
      blobAnchor.download = String(file.name);
      // add download anchor to page
      window.document.body.appendChild(blobAnchor);
      // trigger anchor
      blobAnchor.click();
      // remove anchor from page
      window.document.body.removeChild(blobAnchor);
    });
  }

  private getData(): void {
    this.file$ = this.fileService.get(this.fileId);
  }
}
