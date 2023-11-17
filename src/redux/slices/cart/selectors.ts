import { RootState } from '../../store';

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
