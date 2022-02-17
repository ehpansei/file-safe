import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { FileListModule } from '../file-list.module';
import { File } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private fileList: File[] = [
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
  ];
  private fileList$: Observable<File[]> = of(this.fileList);
  constructor() {}

  public get(): Observable<File[]> {
    return this.fileList$;
  }

  public create(file: File): Observable<boolean> {
    this.fileList.push(file);
    return of(true);
  }

  public delete(index: number): Observable<boolean> {
    this.fileList.splice(index, 1);
    return of(true);
  }
}
