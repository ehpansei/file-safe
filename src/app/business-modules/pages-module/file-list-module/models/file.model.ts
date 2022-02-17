import { BaseModel } from '@infrastructure-module/models/base.model';

export class File extends BaseModel {
  public name: string;
  public lastModifiedDate: Date;
  public preview: string;
  public type: string;
  public lastModified?: number;
  public size?: number;

  constructor(data: File) {
    super(data.id);

    this.name = data.name;
    this.lastModifiedDate = data.lastModifiedDate;
    this.preview = data.preview;
    this.lastModified = data.lastModified;
    this.size = data.size;
    this.type = data.type;
  }
}
