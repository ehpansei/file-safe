export class File {
  public id: number;
  public name: string;
  public lastModifiedDate: Date;
  public preview: string;
  public type: string;
  public lastModified?: number;
  public size?: number;

  constructor(data: File) {
    this.id = data.id;
    this.name = data.name;
    this.lastModifiedDate = data.lastModifiedDate;
    this.preview = data.preview;
    this.lastModified = data.lastModified;
    this.size = data.size;
    this.type = data.type;
  }
}
