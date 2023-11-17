import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../../utils/getCartFromLS';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { CartItem, CartSliceState } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.title === action.payload.title &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.title === action.payload.title &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice = state.items.reduce(
          (acc, item) => item.price * item.count + acc,
          0
        );

        state.totalPrice = state.items.reduce(
          (acc, item) => item.price * item.count + acc,
          0
        );
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(
        (obj) =>
          obj.title !== action.payload.title ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size
      );
      state.totalPrice = state.items.reduce(
        (acc, item) => item.price * item.count + acc,
        0
      );
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
