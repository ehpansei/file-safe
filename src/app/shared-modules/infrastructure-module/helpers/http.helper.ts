export class HttpHelper {
  public static buildQueryString(params: object): string {
    let queryString: string = '';

    Object.keys(params).forEach((paramName, index) => {
      queryString += `${paramName}=${params[paramName as keyof object]}`;
      if (index !== Object.keys(params).length - 1) {
        queryString += '&';
      }
    });

    return queryString;
  }
}
