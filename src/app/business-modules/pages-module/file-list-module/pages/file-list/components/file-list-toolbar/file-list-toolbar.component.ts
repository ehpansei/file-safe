import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadComponent } from '@pages-module/pages/components/file-upload/file-upload.component';
import { AuthenticationService } from '@infrastructure-module/services/authentication/authentication.service';
import { debounceTime, Subscription } from 'rxjs';
import { AppConfig } from 'src/configs/app.config';

@Component({
  selector: 'file-list-toolbar',
  templateUrl: './file-list-toolbar.component.html',
  styleUrls: ['./file-list-toolbar.component.scss'],
  host: { class: 'c-fileListToolbar' }
})
export class FileListToolbarComponent implements OnInit {
  @Output() searchTerm = new EventEmitter<string>();
  @Output() upload = new EventEmitter<File>();

  public searchFormGroup: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
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
        this.upload.emit(file);
        dialogRef.close();
      }
    });
  }

  public onClickLogout(): void {
    this.authenticationService.logout().subscribe();
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
