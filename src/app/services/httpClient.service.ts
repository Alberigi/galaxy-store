import { Inject, Injectable } from '@angular/core';
import { IAxiosInstance } from '../interfaces/instances';
import { IHttpClientService } from '../interfaces/services';

@Injectable()
export class HttpClientService implements IHttpClientService {
  constructor(
    @Inject(IAxiosInstance.name) private axiosInstance: IAxiosInstance
  ) {}

  async get<T>(url: string, config = {}): Promise<T> {
    const result = await this.axiosInstance.get(url, config);
    return result.data;
  }

  async post<T>(url: string, data: any, config = {}): Promise<T> {
    const result = await this.axiosInstance.post(url, data, config);
    return result.data;
  }
}
