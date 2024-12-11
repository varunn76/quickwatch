import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Define the shape of your state
interface DiscoverState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: DiscoverState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk with types
export const fetchDiscover = createAsyncThunk<any, URLSearchParams>(
  'discover/fetchDiscover',
  async (params) => {
    const response = await fetch(`/api/discover?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json();
  }
);

// Create slice with types
const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscover.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscover.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDiscover.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      });
  },
});

export default discoverSlice.reducer;
