export abstract class BaseModel {
  public id: string | undefined;

  constructor(id?: string) {
    this.id = id;
  }
}
