import { createReducer, on } from '@ngrx/store';
import { ICartItem, ICartState } from 'src/app/interfaces/models';
import { addItem, clearCart, changeQtd, removeItem } from './cart.actions';

const cartInitialState: ICartState = {
  items: [],
  amountValue: 0,
};

export const cartReducer = createReducer(
  cartInitialState,
  on(addItem, (state, { payload }) => {
    return handleAddItem(state, payload);
  }),
  on(removeItem, (state, { payload }) => {
    return handleRemoveItem(state, payload);
  }),
  on(changeQtd, (state, { payload }) => {
    return handleChangeQtd(state, payload);
  }),
  on(clearCart, () => {
    return handleClearItems();
  })
);

function handleAddItem(state: ICartState, item: ICartItem): ICartState {
  const newState = { ...state };
  const items = insertInCart(newState.items, item);
  const amountValue = calculateTotal(items);

  return { amountValue, items };
}

function handleRemoveItem(state: ICartState, itemId: string): ICartState {
  const newState = { ...state };
  const items = newState.items.filter((i) => i.id !== itemId);
  const amountValue = calculateTotal(items);

  return { amountValue, items };
}

function handleChangeQtd(
  state: ICartState,
  { id, qtd }: { id: string; qtd: number }
): ICartState {
  const index = state.items.findIndex((i) => i.id === id);
  const foundItem = JSON.parse(JSON.stringify(state.items[index]));
  const items = state.items.filter((i) => i.id !== id);

  foundItem.qtd = qtd;
  const newItems = [...items, foundItem];

  const amountValue = calculateTotal(newItems);

  return { amountValue, items: newItems };
}

function handleClearItems(): ICartState {
  return cartInitialState;
}

function insertInCart(items: ICartItem[], cart: ICartItem): ICartItem[] {
  const index = items.findIndex((i) => i.id === cart.id);

  if (index !== -1) {
    const foundItem = JSON.parse(JSON.stringify(items[index]));
    const newItems = items.filter((i) => i.id !== cart.id);

    foundItem.qtd += cart.qtd;
    return [...newItems, foundItem];
  } else {
    return [...items, cart];
  }
}

function calculateTotal(items: ICartItem[]): number {
  let total: number = 0;

  items.forEach((item) => {
    total += item.price * item.qtd;
  });

  return total;
}
