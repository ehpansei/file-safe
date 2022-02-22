import { FileList } from '@app/business-modules/pages-module/file-list-module/models/file-list.model';
import { File as FileModel } from '@app/business-modules/pages-module/file-list-module/models/file.model';

export class FileMock {
  static readonly file1: FileModel = {
    id: 1,
    name: 'file1',
    lastModifiedDate: new Date(),
    preview: '',
    type: ''
  };

  static readonly fileList1: FileList = {
    isLoading: false,
    response: {
      count: 15,
      list: {
        current_page: 1,
        data: [FileMock.file1],
        first_page_url: '',
        from: 1,
        last_page: 1,
        last_page_url: '',
        links: [],
        next_page_url: '',
        path: '',
        per_page: 1,
        prev_page_url: '',
        to: 1,
        total: 1
      }
    }
  };
}
