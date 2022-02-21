import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FileService } from '@pages-module/file-list-module/services/file.service';
import { FileUploadComponent } from '@pages-module/pages/components/file-upload/file-upload.component';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { SnackbarService } from '@infrastructure-module/services/snackbar/snackbar.service';
import {
  debounceTime,
  finalize,
  interval,
  Subject,
  Subscription,
  takeUntil
} from 'rxjs';
import { AppConfig } from 'src/configs/app.config';

@Component({
  selector: 'file-list-toolbar',
  templateUrl: './file-list-toolbar.component.html',
  styleUrls: ['./file-list-toolbar.component.scss'],
  host: { class: 'c-fileListToolbar' }
})
export class FileListToolbarComponent implements OnInit {
  @Output() searchTerm = new EventEmitter<string>();
  @Output() refreshList = new EventEmitter();
  @Output() isUploading = new EventEmitter<boolean>();

  public searchFormGroup: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private fileService: FileService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initSearch();
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

  public onClickLogout(): void {
    this.authenticationService.logout().subscribe();
  }

  private uploadFile(
    file: File,
    dialogRef: MatDialogRef<FileUploadComponent>
  ): void {
    const destroy$ = new Subject();
    this.isUploading.emit(true);

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
            this.isUploading.emit(false);
          })
        )
        .subscribe({
          next: (resp: any) => {
            // show success toast
            this.snackbarService.success('File successfully uploaded');
            // TODO: not working on finalize when I close the modal for some reason
            this.isUploading.emit(false);
            this.refreshList.emit();
          },
          error: (err) => {
            // show failure toast
            this.snackbarService.failure('File successfully uploaded');
            this.isUploading.emit(false);
          }
        });
    }, AppConfig.config.uploadDelayTimeout);
  }

  private initSearch(): void {
    this.initSearchForm();
    this.initSearchFormChangeSubscription();
  }

  private initSearchForm(): void {
    this.searchFormGroup = this.fb.group({
      term: this.fb.control(null)
    });
  }

  private initSearchFormChangeSubscription(): void {
    this.subscriptions.add(
      this.searchFormGroup.controls.term.valueChanges
        .pipe(debounceTime(AppConfig.config.searchDebounceTime))
        .subscribe((term: string) => {
          this.searchTerm.emit(term);
        })
    );
  }
}
