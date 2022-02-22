import { File as FileModel } from './file.model';

export class FileList {
  public isLoading: boolean;
  public response?: {
    count: 15;
    list: {
      current_page: 1;
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
  };
}
