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
      const cityData = action.payload;

      const exists = state.favorites.find(
        (item) => item.city === cityData.city
      );

      if (!exists) {
        state.favorites.push(cityData);
      }
    },

    
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.city !== action.payload
      );
    }
  }
});

export const { setAirData, addFavorite, removeFavorite } = airSlice.actions;
export default airSlice.reducer;