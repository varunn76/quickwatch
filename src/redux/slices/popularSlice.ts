import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopularState {
  popularData: any[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
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
    setPopularData(state, action: PayloadAction<any[]>) {
      state.popularData = action.payload;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    goToPrevSlide(state) {
      state.currentIndex =
        state.currentIndex === 0
          ? state.popularData.length - 1
          : state.currentIndex - 1;
    },
    goToNextSlide(state) {
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
