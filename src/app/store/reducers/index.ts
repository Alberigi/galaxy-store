import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { cartReducer } from '../cart/cart.reducer';
import { productsReducer } from '../products/products.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  products: productsReducer,
  cart: cartReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
