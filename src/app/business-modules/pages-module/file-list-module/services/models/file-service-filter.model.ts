import { AppConfig } from 'src/configs/app.config';

export class FileServiceFilter {
  searchTerm?: string;
  page: number;
  perPage = AppConfig.lists.filePageSize;

  constructor() {
    this.page = 1;
  }
}
