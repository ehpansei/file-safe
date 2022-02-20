import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { FileService } from '@file-list-module/services/file.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { File as FileModel } from '@file-list-module/models/file.model';
import { FileList } from '../../models/file-list.model';

@Component({
  templateUrl: './file-list.page.html',
  styleUrls: ['./file-list.page.scss']
})
export class FileListPage implements OnInit, OnDestroy {
  public fileList$: Observable<FileList>;
  public searchFormGroup: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    public dialog: MatDialog,
    private fileService: FileService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setData();
    this.initSearch();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onClickUploadFile(): void {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '300px'
    });

    dialogRef.componentInstance.fileUploaded.subscribe((success: boolean) => {
      if (success) {
        this.setData();
      }
    });
  }

  public onDeleteFile(index: number): void {
    // open confirm delete modal
    // this.fileService.delete(index);
  }

  private setData(): void {
    this.fileList$ = this.fileService.list();
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
        .pipe(debounceTime(1000))
        .subscribe((term: string) => {
          this.fileList$ = this.fileService.list({ term });
        })
    );
  }
}
