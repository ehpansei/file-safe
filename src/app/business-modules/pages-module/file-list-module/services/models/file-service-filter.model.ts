import { AppConfig } from 'src/configs/app.config';

export class FileServiceFilter {
  searchTerm?: string;
  page: number;
  perPage = AppConfig.lists.file.pageSize;

  constructor() {
    this.page = 1;
  }
}
