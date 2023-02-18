import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface IFetchPizzas {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: number;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ category, sortBy, order, search, currentPage }: IFetchPizzas) => {
    const { data } = await axios.get(
      `http://localhost:3001/items?_page=${currentPage}&_limit=8&${category}&_sort=${sortBy}&_order=${order}${search}`,
    );

    return data;
  },
);

export interface IPizzaState {
  items: {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    category: number;
    types: number[];
    sizes: number[];
    rating: number;
  }[];
  status: string;
}

const initialState: IPizzaState = {
  items: [],
  status: 'loading', // loading || successful || error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'successful';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
      console.log('ОШИБКА');
    });
  },
});

export const pizzaSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
