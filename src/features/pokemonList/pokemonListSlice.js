import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";

export const fetchPokemonList = createAsyncThunk(
  "pokemonList/fetchPokemonList",
  async (url) => {
    try {
      const response = await fetch(`${url ? url : `${BASE_URL}pokemon`}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const pokemonListSlice = createSlice({
  name: "pokemon list",
  initialState: {
    pokemonList: [],
    isLoading: true,
    error: null,
    urls: {
      currentUrl: "",
      prevUrl: "",
      nextUrl: "",
    },
  },
  reducers: {},
  extraReducers: {
    [fetchPokemonList.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPokemonList.fulfilled]: (state, action) => {
      state.pokemonList = action.payload.results;
      state.urls.prevUrl = action.payload.previous;
      state.urls.nextUrl = action.payload.next;
      state.isLoading = false;
    },
    [fetchPokemonList.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export default pokemonListSlice.reducer;