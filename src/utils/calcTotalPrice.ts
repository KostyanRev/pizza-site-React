import { CartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((acc, item) => item.price * item.count + acc, 0);
};
