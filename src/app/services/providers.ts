import { Provider } from '@angular/core';
import axios from 'axios';
import { IAxiosInstance } from '../interfaces/instances';
import { IHttpClientService, IProductService } from '../interfaces/services';
import { HttpClientService } from './httpClient.service';
import { ProductService } from './product.service';

export const ServicesProviders: Provider[] = [
  {
    provide: IAxiosInstance.name,
    useFactory: () => axios,
  },
  {
    provide: IHttpClientService,
    useClass: HttpClientService,
  },
  {
    provide: IProductService,
    useClass: ProductService,
  },
];
