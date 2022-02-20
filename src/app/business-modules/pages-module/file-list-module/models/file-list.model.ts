import { File } from './file.model';

export class FileList {
  public list: File[];

  constructor(data: FileList) {
    this.list = data.list;
  }
}
