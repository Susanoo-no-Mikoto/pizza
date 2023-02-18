import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ICartState {
  items: {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    type: string;
    size: number;
    count: number;
  }[];
  totalPrice: number;
}

const initialState: ICartState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const findPizza = state.items.find((item) => item.id === action.payload.id);
      if (findPizza) {
        findPizza.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    minusPizza(state, action) {
      const findPizza = state.items.find((item) => item.id === action.payload);
      if (findPizza) {
        findPizza.count--;
      }
    },
    removePizza(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearPizzas(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const cartItemsByIdSelector = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { addPizza, minusPizza, removePizza, clearPizzas } = cartSlice.actions;

export default cartSlice.reducer;
