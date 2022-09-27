import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch the selected Pokemon's details
export const fetchSelectedPokemon = createAsyncThunk(
  "selectedPokemonInfo/fetchSelectedPokemon",
  async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const selectedPokemonInfoSlice = createSlice({
  name: "selected pokemon info",
  initialState: {
    isLoading: true,
    info: {},
    error: null,
    url: "",
  },
  reducers: {
    updateSelectedPokemonInfo: (state, action) => {
      state.info = action.payload;
    },
    removeSelectedPokemonInfo: (state, action) => {
      state.info = {};
    },
  },
  extraReducers: {
    [fetchSelectedPokemon.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSelectedPokemon.fulfilled]: (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
    },
    [fetchSelectedPokemon.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export const { updateSelectedPokemonInfo, removeSelectedPokemonInfo } =
  selectedPokemonInfoSlice.actions;

export default selectedPokemonInfoSlice.reducer;
