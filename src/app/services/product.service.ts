import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IOrderDTO } from '../interfaces/dtos';
import { ICartItem, IProduct } from '../interfaces/models';
import { IHttpClientService, IProductService } from '../interfaces/services';

@Injectable()
export class ProductService implements IProductService {
  private messageIncompleteData = 'Informe seus dados.';
  private messageEmptyCart = 'Coloque ao menos um produto ao carrinho.';

  constructor(
    private httpClientService: IHttpClientService,
    private toastr: ToastrService
  ) {}

  async get(): Promise<IProduct[]> {
    return this.httpClientService.get<IProduct[]>('/api/equipments');
  }

  async getOrdered(order: string): Promise<IProduct[]> {
    return this.httpClientService.get<IProduct[]>(
      `/api/equipments?orderBy=${order}`
    );
  }

  async search(search: string): Promise<IProduct[]> {
    return this.httpClientService.get<IProduct[]>(
      `/api/equipments?search=${search}`
    );
  }

  async sendOrder(
    cartItems: ICartItem[],
    name: string,
    deliveryAddress: string
  ): Promise<IOrderDTO> {
    if (!name || !deliveryAddress) {
      this.toastr.error(this.messageIncompleteData);
      throw new Error(this.messageIncompleteData);
    }

    const items = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.qtd,
    }));

    if (!items.length) {
      this.toastr.error(this.messageEmptyCart);
      throw new Error(this.messageEmptyCart);
    }

    const orders = {
      name,
      deliveryAddress,
      items,
    };

    const result = await this.httpClientService.post<IOrderDTO>(
      '/api/orders',
      orders
    );

    return result;
  }
}
