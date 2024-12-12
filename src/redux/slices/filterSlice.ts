/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  activeFilter: string;
  selectedGenre: string;
  selectedYear: string;
  searchQuery: string;
  data: any[];
  loading: boolean;
  showModal: boolean;
}

const initialState: FilterState = {
  activeFilter: 'Movie',
  selectedGenre: '',
  selectedYear: 'Select Year',
  searchQuery: '',
  data: [],
  loading: false,
  showModal: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveFilter(state, action: PayloadAction<string>) {
      state.activeFilter = action.payload;
    },
    setSelectedGenre(state, action: PayloadAction<string>) {
      state.selectedGenre = action.payload;
    },
    setSelectedYear(state, action: PayloadAction<string>) {
      state.selectedYear = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
  },
});

export const {
  setActiveFilter,
  setSelectedGenre,
  setSelectedYear,
  setSearchQuery,
  setData,
  setLoading,
  setShowModal,
} = filterSlice.actions;

export default filterSlice.reducer;
