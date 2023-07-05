import { IProduct } from './product.model';

export interface ICartState {
  items: ICartItem[];
  amountValue: number;
}

export interface ICartItem extends IProduct {
  qtd: number;
}
