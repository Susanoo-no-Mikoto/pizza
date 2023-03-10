import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface IFilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: IFilterState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности ↓', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
