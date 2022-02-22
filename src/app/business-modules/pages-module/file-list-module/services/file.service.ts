import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, startWith, tap } from 'rxjs';
import { File as FileModel } from '@file-list-module/models/file.model';
import { environment } from 'src/environments/environment';
import { FileList } from '../models/file-list.model';
import { FileServiceFilter } from './models/file-service-filter.model';
import { HttpHelper } from '@app/shared-modules/infrastructure-module/helpers/http.helper';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  /* private fileList: File[] = [
    {
      name: 'file0',
      id: '0',
      lastModifiedDate: new Date(),
      preview: 'path0',
      type: 'application/x-msdownload'
    },
    {
      name: 'file1',
      id: '1',
      lastModifiedDate: new Date(),
      preview: 'path1',
      type: 'application/x-msdownload'
    },
    {
      name: 'file2',
      id: '2',
      lastModifiedDate: new Date(),
      preview: 'path2',
      type: 'application/x-msdownload'
    },
    {
      name: 'file3',
      id: '3',
      lastModifiedDate: new Date(),
      preview: 'path3',
      type: 'application/x-msdownload'
    }
    private fileList$: Observable<File[]> = of(this.fileList);
  ]; */

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

    console.log(queryParams);

    return this.httpClient
      .get<FileList>(this.endpoint + `?${HttpHelper.buildQueryString(params)}`)
      .pipe(
        map((files: any) => {
          return { isLoading: false, response: files };
        }),
        startWith({ isLoading: true }),
        tap((val) => console.log(val))
      );
  }

  public get(id: number): Observable<FileModel> {
    return this.httpClient.get<any>(this.endpoint + '/' + id);
  }

  public delete(id: number): Observable<FileModel> {
    return this.httpClient.delete<FileModel>(this.endpoint + '/' + id);
  }
}
