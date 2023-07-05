import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/interfaces/models';

export enum ActionTypes {
  GET_PRODUCTS = '[GET_PRODUCTS]',
}

export const getProducts = createAction(
  ActionTypes.GET_PRODUCTS,
  props<{ payload: IProduct[] }>()
);
