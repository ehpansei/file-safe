import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  debounceTime,
  finalize,
  interval,
  Observable,
  Subject,
  Subscription,
  takeUntil
} from 'rxjs';
import { FileService } from '@file-list-module/services/file.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileList } from '@file-list-module/models/file-list.model';
import { SnackbarService } from '@infrastructure-module/services/snackbar/snackbar.service';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { AppConfig } from 'src/configs/app.config';
import { File as FileModel } from '@file-list-module//models/file.model';

@Component({
  templateUrl: './file-list.page.html',
  styleUrls: ['./file-list.page.scss']
})
export class FileListPage implements OnInit, OnDestroy {
  public fileList$: Observable<FileList>;
  // public searchFormGroup: FormGroup;
  public filesUploading = false;

  private subscriptions = new Subscription();

  constructor(
    public dialog: MatDialog,
    private fileService: FileService,
    private snackbarService: SnackbarService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setData();
    // this.initSearch();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onClickUploadFile(): void {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '300px'
    });

    dialogRef.componentInstance.fileUploaded.subscribe((file: File) => {
      if (file) {
        this.uploadFile(file, dialogRef);
      }
    });
  }

  public onDeleteFile(index: number): void {
    this.fileService.delete(index).subscribe((resp: FileModel) => {
      console.log(resp);
      this.snackbarService.success(`File has been deleted`);
      this.setData();
    });
    // open confirm delete modal
    // this.fileService.delete(index);
  }

  private uploadFile(
    file: File,
    dialogRef: MatDialogRef<FileUploadComponent>
  ): void {
    const destroy$ = new Subject();
    this.filesUploading = true;
    // start an interval that renews token every X seconds while file is uploading
    interval(AppConfig.config.renewTokenInterval)
      .pipe(takeUntil(destroy$))
      .subscribe(() => {
        // make renew token request
        this.authenticationService.renew().subscribe();
      });

    // upload request
    setTimeout(() => {
      this.fileService
        .create(file)
        .pipe(
          finalize(() => {
            destroy$.next(true);
            dialogRef.close();
            dialogRef.componentInstance.isUploading = false;
            this.filesUploading = false;
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
    this.fileList$ = this.fileService.list();
  }

 /*  private initSearch(): void {
    this.initSearchForm();
    this.initSearchFormChangeSubscription();
  } */

/*   private initSearchForm(): void {
    this.searchFormGroup = this.fb.group({
      term: this.fb.control(null)
    });
  }

  private initSearchFormChangeSubscription(): void {
    this.subscriptions.add(
      this.searchFormGroup.controls.term.valueChanges
        .pipe(debounceTime(AppConfig.config.searchDebounceTime))
        .subscribe((term: string) => {
          this.fileList$ = this.fileService.list({ term });
        })
    );
  } */
}
