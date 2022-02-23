import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, startWith, tap } from 'rxjs';
import { File as FileModel } from '@file-list-module/models/file.model';
import { environment } from 'src/environments/environment';
import { FileList } from '@file-list-module/models/file-list.model';
import { FileServiceFilter } from './models/file-service-filter.model';
import { HttpHelper } from '@infrastructure-module/helpers/http.helper';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly endpoint = environment.api.base + 'files';

  constructor(private httpClient: HttpClient) {}

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

    return this.httpClient
      .get<FileList>(this.endpoint + `?${HttpHelper.buildQueryString(params)}`)
      .pipe(
        map((files: any) => {
          return { ...files, isLoading: false, response: files };
        }),
        startWith({ isLoading: true }),
        tap((val) => console.log(val))
      );
  }

  public get(id: number): Observable<FileModel> {
    return this.httpClient.get<FileModel>(this.endpoint + '/' + id);
  }

  public delete(id: number): Observable<FileModel> {
    return this.httpClient.delete<FileModel>(this.endpoint + '/' + id);
  }

  public download(id: number): Observable<Blob> {
    return this.httpClient.get<Blob>(this.endpoint + '/' + id + '/download', {
      responseType: 'blob' as 'json'
    });
  }
}
