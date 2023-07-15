import { IOrderDTO } from '../dtos';
import { ICartItem, IProduct } from '../models';

export abstract class IProductService {
  abstract get(): Promise<IProduct[]>;

  abstract getOrdered(order: string): Promise<IProduct[]>;

  abstract search(search: string): Promise<IProduct[]>;

  abstract sendOrder(
    cartItems: ICartItem[],
    name: string,
    deliveryAddress: string
  ): Promise<IOrderDTO>;
}
