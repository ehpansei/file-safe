import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  finalize,
  interval,
  Observable,
  Subject,
  Subscription,
  takeUntil
} from 'rxjs';
import { FileService } from '@file-list-module/services/file.service';
import { SnackbarService } from '@infrastructure-module/services/snackbar/snackbar.service';
import { File as FileModel } from '@file-list-module//models/file.model';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { AppConfig } from 'src/configs/app.config';
import { TimerService } from '@infrastructure-module/services/timer/timer.service';
import { FileServiceFilter } from '@file-list-module/services/models/file-service-filter.model';
import { ConfirmDeleteDialogComponent } from '@modals-module/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { FileList as FileListModel } from '@file-list-module/models/file-list.model';

@Component({
  templateUrl: './file-list.page.html',
  styleUrls: ['./file-list.page.scss']
})
export class FileListPage implements OnInit, OnDestroy {
  public fileList$: Observable<FileListModel>;
  public uploading$ = new BehaviorSubject<boolean>(false);

  private subscriptions = new Subscription();
  private filter: FileServiceFilter = new FileServiceFilter();

  constructor(
    public dialog: MatDialog,
    private fileService: FileService,
    private snackbarService: SnackbarService,
    private authenticationService: AuthenticationService,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.setData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Opens confirm delete modal and subscribes to confirm action callback
   *
   * @param file
   */
  public onDeleteFile(file: FileModel): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px'
    });

    dialogRef.componentInstance.fileName = file.name;

    dialogRef.componentInstance.confirmDelete.subscribe(() => {
      this.fileService.delete(file.id).subscribe((resp: FileModel) => {
        this.snackbarService.success(`File has been deleted`);
        dialogRef.close();
        this.setData();
      });
    });
  }

  /**
   * Updates the current filter with the term written on the search field
   * and requests new data
   *
   * @param term
   */
  public onSearchTerm(term: string): void {
    this.filter.page = 1;
    this.filter.searchTerm = term;
    this.setData();
  }

  public onRefreshList(): void {
    this.setData();
  }

  public onUpload(event: { file: File; dialogRef: any }): void {
    this.uploadFile(event);
  }

  public onClickNext(): void {
    this.filter.page++;
    this.setData();
  }

  public onClickPrevious(): void {
    this.filter.page--;
    this.setData();
  }

  public trackByFn(index: any, item: FileModel): number {
    return item.id;
  }

  private uploadFile(event: { file: File; dialogRef: any }): void {
    const destroy$ = new Subject();
    this.uploading$.next(true);

    // start an interval that renews token every X seconds while file is uploading
    this.subscriptions.add(
      interval(AppConfig.config.renewTokenInterval)
        .pipe(takeUntil(destroy$))
        .subscribe(() => {
          // make renew token request
          this.authenticationService.renew().subscribe();
          // restart timer
          this.timerService.start();
        })
    );

    // upload request
    setTimeout(() => {
      this.fileService
        .create(event.file)
        .pipe(
          finalize(() => {
            destroy$.next(true);
            this.uploading$.next(false);
            event.dialogRef.close();
          })
        )
        .subscribe({
          next: (resp: any) => {
            // show success toast
            this.snackbarService.success('File successfully uploaded');
            this.setData();
          },
          error: (err) => {
            // show failure toast
            this.snackbarService.failure('File successfully uploaded');
          }
        });
    }, AppConfig.config.uploadDelayTimeout);
  }

  private setData(): void {
    this.fileList$ = this.fileService.list(this.filter);
  }
}
