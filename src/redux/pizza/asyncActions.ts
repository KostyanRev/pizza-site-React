import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { orderType, category, sortBy, currentPage } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://6558d3a1e93ca47020a9c871.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${orderType}`
    );

    return data;
  }
);
