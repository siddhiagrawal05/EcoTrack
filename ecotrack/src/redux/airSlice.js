import { createSlice } from "@reduxjs/toolkit";

const airSlice = createSlice({
  name: "air",
  initialState: {
    data: null,
    favorites: []
  },
  reducers: {
    setAirData: (state, action) => {
      state.data = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        city => city !== action.payload
      );
    }
  }
});

export const { setAirData, addFavorite, removeFavorite } = airSlice.actions;
export default airSlice.reducer;