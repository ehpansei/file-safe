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
import { FileList } from '@file-list-module/models/file-list.model';
import { SnackbarService } from '@infrastructure-module/services/snackbar/snackbar.service';
import { File as FileModel } from '@file-list-module//models/file.model';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { AppConfig } from 'src/configs/app.config';
import { TimerService } from '@infrastructure-module/services/timer/timer.service';

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

  public onUpload(file: File): void {
    this.uploadFile(file);
  }

  private uploadFile(file: File): void {
    const destroy$ = new Subject();
    this.uploading$.next(true);

    // start an interval that renews token every X seconds while file is uploading
    interval(AppConfig.config.renewTokenInterval)
      .pipe(takeUntil(destroy$))
      .subscribe(() => {
        // make renew token request
        this.authenticationService.renew().subscribe();
        // restart timer
        this.timerService.start();
      });

    // upload request
    setTimeout(() => {
      this.fileService
        .create(file)
        .pipe(
          finalize(() => {
            destroy$.next(true);
            this.uploading$.next(false);
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
    this.fileList$ = this.fileService.list(this.searchTerms);
  }
}
