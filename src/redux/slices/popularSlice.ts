import { MovieData } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Movie {
//   [x: string]: any;
//   id: number;
//   title: string;
//   poster_path: string;
//   backdrop_path: string;
// }

interface PopularState {
  popularData: MovieData[];
  currentIndex: number;
  loading: boolean;
  error: unknown;
}

const initialState: PopularState = {
  popularData: [],
  currentIndex: 0,
  loading: false,
  error: null,
};

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    setPopularData(state, action: PayloadAction<MovieData[]>) {
      state.popularData = action.payload;
      state.currentIndex = 0; // Reset index on new data
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      if (action.payload >= 0 && action.payload < state.popularData.length) {
        state.currentIndex = action.payload;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<unknown>) {
      state.error = action.payload;
    },
    goToPrevSlide(state) {
      if (state.popularData.length === 0) return;
      state.currentIndex =
        state.currentIndex === 0
          ? state.popularData.length - 1
          : state.currentIndex - 1;
    },
    goToNextSlide(state) {
      if (state.popularData.length === 0) return;
      state.currentIndex =
        state.currentIndex === state.popularData.length - 1
          ? 0
          : state.currentIndex + 1;
    },
  },
});

export const {
  setPopularData,
  setCurrentIndex,
  setLoading,
  setError,
  goToPrevSlide,
  goToNextSlide,
} = popularSlice.actions;

export default popularSlice.reducer;
