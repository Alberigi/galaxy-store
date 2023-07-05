export abstract class IHttpClientService {
  abstract get<T>(url: string, config?: any): Promise<T>;

  abstract post<T>(url: string, data: any, config?: any): Promise<T>;
}
