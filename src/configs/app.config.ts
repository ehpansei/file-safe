export class AppConfig {
  static readonly config = {
    renewTokenInterval: 1000,
    uploadDelayTimeout: 10000,
    searchDebounceTime: 1000
  };

  static readonly session = {
    sessionTime: 300000 // 5 minutes
  };
}
