import { createReducer, on } from '@ngrx/store';
import { IProductsState } from 'src/app/interfaces/models';
import { getProducts } from './products.actions';

const productsInitialState: IProductsState = {
  items: [],
};

export const productsReducer = createReducer(
  productsInitialState,
  on(getProducts, (state, { payload }) => {
    return {
      ...state,
      items: payload,
    };
  })
);
