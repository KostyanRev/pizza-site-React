import { Order } from '../filter/types';

export type SearchPizzaParams = {
  orderType: Order;
  category: string;
  sortBy: string;
  currentPage: number;
};

export type Pizza = {
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
  count: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
