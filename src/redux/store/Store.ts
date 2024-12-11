// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '@/redux/slices/filterSlice';
import popularReducer from '@/redux/slices/popularSlice';
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    popular: popularReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
