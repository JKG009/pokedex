import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetches the Evolution Url for the selected Pokemon
export const fetchEvoChainUrl = createAsyncThunk(
  "selectedPokemonEvo/fetchEvoChainUrl",
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

// Fetches the details of each Pokemon in an evolution chain
export const fetchEvoChainPokemons = createAsyncThunk(
  "selectedPokemonEvo/fetchEvoChainPokemons",
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

const initialState = {
  error: null,
  url: {
    isLoading: true,
    speciesUrl: "",
    prevEvolutionUrl: "",
    evolutionUrl: "",
  },
  pokemonEvoDetails: {
    isLoading: true,
    firstEvoName: "",
    firstImgSrc: "",
    secondEvoName: "",
    secondImgSrc: "",
    thirdEvoName: undefined,
    thirdImgSrc: undefined,
  },
};

export const selectedPokemonEvoSlice = createSlice({
  name: "selected pokemon evo species",
  initialState,
  reducers: {
    updateSelectedPokemonSpeciesUrl: (state, action) => {
      state.url.speciesUrl = action.payload;
    },
    updateSelectedPokemonEvoUrl: (state, action) => {
      state.url.evolutionUrl = action.payload;
    },
    updatePrevEvolutionUrl: (state, action) => {
      state.url.prevEvolutionUrl = action.payload;
    },
    removeEvoImgSrc: (state) => {
      state.pokemonEvoDetails.firstImgSrc = "";
      state.pokemonEvoDetails.secondImgSrc = "";
      state.pokemonEvoDetails.thirdImgSrc = "";
    },
    updateFirstImgSrc: (state, action) => {
      state.pokemonEvoDetails.firstImgSrc = action.payload;
    },
    updateSecondImgSrc: (state, action) => {
      state.pokemonEvoDetails.secondImgSrc = action.payload;
    },
    updateThirdImgSrc: (state, action) => {
      state.pokemonEvoDetails.thirdImgSrc = action.payload;
    },
    resetEvoSlice: () => initialState,
  },
  extraReducers: {
    [fetchEvoChainUrl.pending]: (state) => {
      state.url.isLoading = true;
    },
    [fetchEvoChainUrl.fulfilled]: (state, action) => {
      state.url.isLoading = false;
      state.url.evolutionUrl = action.payload.evolution_chain.url;
    },
    [fetchEvoChainUrl.rejected]: (state, action) => {
      state.url.isLoading = false;
      state.error = action.error.message;
    },
    [fetchEvoChainPokemons.pending]: (state, action) => {
      state.pokemonEvoDetails.isLoading = true;
    },
    [fetchEvoChainPokemons.fulfilled]: (state, action) => {
      state.pokemonEvoDetails.isLoading = false;
      state.pokemonEvoDetails.firstEvoName = action.payload.chain.species.name;
      state.pokemonEvoDetails.secondEvoName =
        action.payload.chain.evolves_to[0].species.name;
      state.pokemonEvoDetails.thirdEvoName =
        action.payload.chain.evolves_to[0].evolves_to[0]?.species.name;
    },
    [fetchEvoChainPokemons.rejected]: (state, action) => {
      state.pokemonEvoDetails.isLoading = false;
      state.error = [...state.error, action.error.message];
    },
  },
});

export const {
  updateSelectedPokemonEvoUrl,
  updateSelectedPokemonSpeciesUrl,
  updatePrevEvolutionUrl,
  removeEvoImgSrc,
  updateFirstImgSrc,
  updateSecondImgSrc,
  updateThirdImgSrc,
  resetEvoSlice,
} = selectedPokemonEvoSlice.actions;

export default selectedPokemonEvoSlice.reducer;
