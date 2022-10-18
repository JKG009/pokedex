import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEnText } from "../../config";

// Fetches the Evolution Url of the selected Pokemon
export const fetchEvoChainUrl = createAsyncThunk(
  "selectedPokemonEvo/fetchEvoChainUrl",
  async (speciesUrl) => {
    try {
      const response = await fetch(speciesUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      throw Error(error);
    }
  }
);

// Fetches the details of each Pokemon in the whole evolution chain
export const fetchEvoChainPokemons = createAsyncThunk(
  "selectedPokemonEvo/fetchEvoChainPokemons",
  async (evolutionUrl) => {
    try {
      const response = await fetch(evolutionUrl);
      const data = await response.json();
      let pokemonObj = [];
      const iterateObject = (obj) => {
        for (const prop in obj) {
          if (typeof obj[prop] == "object" && prop !== "species") {
            iterateObject(obj[prop]);
          } else {
            if (prop === "species") {
              pokemonObj.push({ name: obj[prop].name, url: obj[prop].url });
            }
          }
        }
      };
      iterateObject(data);
      const pokemonObjInOrder = pokemonObj.reverse();
      return pokemonObjInOrder;
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
    pokemonFlavorText: "",
    evolutionPokemon: [],
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
    removeSelectedPokemonSpeciesUrl: (state) => {
      state.url.speciesUrl = "";
    },
    removeFlavorText: (state) => {
      state.pokemonEvoDetails.pokemonFlavorText = ""
    }
  },
  extraReducers: {
    [fetchEvoChainUrl.pending]: (state) => {
      state.url.isLoading = true;
    },
    [fetchEvoChainUrl.fulfilled]: (state, action) => {
      state.url.isLoading = false;
      state.pokemonEvoDetails.pokemonFlavorText = getEnText(
        action.payload.flavor_text_entries
      );
      state.url.evolutionUrl = action.payload.evolution_chain.url;
    },
    [fetchEvoChainUrl.rejected]: (state, action) => {
      state.url.isLoading = false;
      state.error = action.error.message;
    },
    [fetchEvoChainPokemons.pending]: (state) => {
      state.pokemonEvoDetails.isLoading = true;
    },
    [fetchEvoChainPokemons.fulfilled]: (state, action) => {
      state.pokemonEvoDetails.isLoading = false;
      state.pokemonEvoDetails.evolutionPokemon = action.payload;
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
  removeSelectedPokemonSpeciesUrl,
  removeFlavorText,
} = selectedPokemonEvoSlice.actions;

export default selectedPokemonEvoSlice.reducer;