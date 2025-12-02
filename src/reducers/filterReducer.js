import { createSlice } from "@reduxjs/toolkit";

// Create a slice for filter state management
const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

// Export action creators. Keep `filterChange` name so existing imports keep working.
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
