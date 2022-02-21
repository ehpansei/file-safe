import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FileService } from '@file-list-module/services/file.service';
import { FileList } from '@file-list-module/models/file-list.model';
import { SnackbarService } from '@infrastructure-module/services/snackbar/snackbar.service';
import { File as FileModel } from '@file-list-module//models/file.model';

@Component({
  templateUrl: './file-list.page.html',
  styleUrls: ['./file-list.page.scss']
})
export class FileListPage implements OnInit, OnDestroy {
  public fileList$: Observable<FileList>;
  public uploading$ = new BehaviorSubject<boolean>(false);

  private subscriptions = new Subscription();
  private searchTerms: { term: string } = { term: '' };

  constructor(
    public dialog: MatDialog,
    private fileService: FileService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.setData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onDeleteFile(file: FileModel): void {
    this.fileService.delete(file.id).subscribe((resp: FileModel) => {
      this.snackbarService.success(`File has been deleted`);
      this.setData();
    });
    // open confirm delete modal
    // this.fileService.delete(index);
  }

  public onSearchTerm(term: string): void {
    this.searchTerms.term = term;
    this.setData();
  }

  public onRefreshList(): void {
    this.setData();
  }

  public onIsUploading(isUploading: boolean): void {
    this.uploading$.next(isUploading);
  }

  private setData(): void {
    this.fileList$ = this.fileService.list(this.searchTerms);
  }
}
