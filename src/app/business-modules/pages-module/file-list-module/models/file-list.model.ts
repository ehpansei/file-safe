import { File as FileModel } from './file.model';

export class FileList {
  public count: number;
  public list: {
    current_page: number;
    data: FileModel[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: string[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  };
}
