import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  title: string;
  type: string;
  size: number;
  imageUrl: string;
  count: number;
  price: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
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

      state.totalPrice = state.items.reduce(
        (acc, item) => item.price * item.count + acc,
        0
      );
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItem =
  (
    title: string,
    sizes: number[],
    activeSize: number,
    typeNames: string[],
    activeType: number
  ) =>
  (state: RootState) =>
    state.cart.items.find(
      (obj) =>
        obj.title === title &&
        obj.type === typeNames[activeType] &&
        obj.size === sizes[activeSize]
    );

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
