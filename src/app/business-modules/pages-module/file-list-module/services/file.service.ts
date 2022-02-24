import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap
} from 'rxjs';
import { File as FileModel } from '@file-list-module/models/file.model';
import { environment } from 'src/environments/environment';
import { FileList } from '@file-list-module/models/file-list.model';
import { FileServiceFilter } from './models/file-service-filter.model';
import { HttpHelper } from '@infrastructure-module/helpers/http.helper';
import { SnackbarService } from '@infrastructure-module/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly endpoint = environment.api.base + 'files';

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  public create(file: File): Observable<boolean> {
    // Create form data

    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file);
    return this.httpClient.post<boolean>(this.endpoint, formData);
  }

  public list(params: FileServiceFilter): Observable<FileList> {
    let queryParams: string | undefined;

    Object.entries(params).forEach((entry: any) => {
      queryParams += `&${entry[0]}=${entry[1]}`;
    });

    return this.httpClient.get<FileList>(
      this.endpoint + `?${HttpHelper.buildQueryString(params)}`
    );
  }

  public get(id: number): Observable<FileModel> {
    return this.httpClient.get<FileModel>(this.endpoint + '/' + id);
  }

  public delete(id: number): Observable<FileModel> {
    return this.httpClient.delete<FileModel>(this.endpoint + '/' + id);
  }

  public download(file: FileModel): Observable<FileModel> {
    return this.httpClient
      .get(this.endpoint + '/' + file.id + '/download', {
        responseType: 'blob',
        observe: 'body'
      })
      .pipe(
        switchMap((blob: Blob) => {
          // creates a DOMString containing a URL representing the object given in the parameter
          const url = window.URL.createObjectURL(blob);
          const blobAnchor = window.document.createElement('a');

          blobAnchor.href = url;
          blobAnchor.download = String(file.name);
          // add download anchor to page
          window.document.body.appendChild(blobAnchor);
          // trigger anchor
          blobAnchor.click();
          // remove anchor from page
          window.document.body.removeChild(blobAnchor);
          window.URL.revokeObjectURL(blobAnchor.href);
          blobAnchor.onload = () => {
            // releases object URL to let the browser know not to keep the reference to the file any longer
            window.URL.revokeObjectURL(blobAnchor.href);
          };
          return of(file);
        }),
        catchError((err: any) => {
          this.snackbarService.failure(
            'Something went wrong with the download'
          );

          return of(err);
        })
      );
  }
}
