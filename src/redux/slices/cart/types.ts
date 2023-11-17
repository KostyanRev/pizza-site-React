export type CartItem = {
  title: string;
  type: string;
  size: number;
  imageUrl: string;
  count: number;
  price: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
