import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Observable } from 'rxjs';
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
  public isDownloading = false;

  private fileId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.fileId = this.activatedRoute.snapshot.params.id;
    this.getData();
  }

  public onClickDownload(file: FileModel) {
    this.isDownloading = true;
    this.fileService
      .download(file)
      .pipe(finalize(() => (this.isDownloading = false)))
      .subscribe();
  }

  private getData(): void {
    this.file$ = this.fileService.get(this.fileId);
  }
}
