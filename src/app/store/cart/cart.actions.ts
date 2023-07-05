import { createAction, props } from '@ngrx/store';
import { ICartItem } from 'src/app/interfaces/models';

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  CLEAR = 'CLEAR',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export const addItem = createAction(
  ActionTypes.ADD_ITEM,
  props<{ payload: ICartItem }>()
);

export const removeItem = createAction(
  ActionTypes.REMOVE_ITEM,
  props<{ payload: string }>()
);

export const clearCart = createAction(
  ActionTypes.CLEAR,
  props<{ payload: null }>
);

export const changeQtd = createAction(
  ActionTypes.INCREMENT,
  props<{ payload: { id: string; qtd: number } }>()
);
