export class AppConfig {
  static readonly config = {
    renewTokenInterval: 1000,
    uploadDelayTimeout: 10000,
    searchDebounceTime: 1000
  };

  static readonly session = {
    sessionTime: 300000 // 5 minutes
  };

  static readonly lists = {
    filePageSize: 16
  };

  static readonly emails = {
    regexFormat: '[A-Za-z0-9._%-+]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'
  };
}
