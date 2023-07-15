import { ICartItem } from '../models';

export interface IOrderDTO extends ICartItem {
  id: string;
}
