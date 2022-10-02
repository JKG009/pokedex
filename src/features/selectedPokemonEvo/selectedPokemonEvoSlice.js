import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEnText } from "../../config";

// Fetches the Evolution Url for the selected Pokemon
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

// Fetches the details of each Pokemon in an evolution chain
export const fetchEvoChainPokemons = createAsyncThunk(
  "selectedPokemonEvo/fetchEvoChainPokemons",
  async (evolutionUrl) => {
    try {
      const response = await fetch(evolutionUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      throw Error(error);
    }
  }
);

// Using recursive function to get the names of Pokemon

// export const fetchEvoChainPokemons = createAsyncThunk(
//   "selectedPokemonEvo/fetchEvoChainPokemons",
//   async (evolutionUrl) => {
//     try {
//       const response = await fetch(evolutionUrl);
//       const data = await response.json();
//       let names = [];
//       const iterateObject = (obj) => {
//         for (const prop in obj) {
//           if (typeof obj[prop] == "object" && prop !== "species") {
//             iterateObject(obj[prop]);
//           } else {
//             if (prop === "species") {
//               names.push(obj[prop].name);
//             }
//           }
//         }
//       };
//       iterateObject(data);
//       const namesInOrder = names.reverse();
//       return namesInOrder;
//     } catch (error) {
//       throw Error(error);
//     }
//   }
// );

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
  pokemonFlavorText: "",
  evolutionNameDetails: [],
  evolutionImgSrc: [],
};

export const selectedPokemonEvoSlice = createSlice({
  name: "selected pokemon evo species",
  initialState,
  reducers: {
    updateEvolutionImgSrc: (state, action) => {
      state.evolutionImgSrc = [...state.evolutionImgSrc, action.payload];
    },
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
      state.pokemonEvoDetails.evolutionImgSrc = [];
    },
    removeName: (state) => {
      state.pokemonEvoDetails.evolutionNameDetails = [];
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
  },
  extraReducers: {
    [fetchEvoChainUrl.pending]: (state) => {
      state.url.isLoading = true;
    },
    [fetchEvoChainUrl.fulfilled]: (state, action) => {
      state.url.isLoading = false;
      state.pokemonFlavorText = getEnText(action.payload.flavor_text_entries);
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
      // state.evolutionNameDetails = action.payload;
    },
    [fetchEvoChainPokemons.rejected]: (state, action) => {
      state.pokemonEvoDetails.isLoading = false;
      state.error = [...state.error, action.error.message];
    },
  },
});

export const {
  updateEvolutionImgSrc,
  updateSelectedPokemonEvoUrl,
  updateSelectedPokemonSpeciesUrl,
  updatePrevEvolutionUrl,
  removeName,
  removeEvoImgSrc,
  updateFirstImgSrc,
  updateSecondImgSrc,
  updateThirdImgSrc,
} = selectedPokemonEvoSlice.actions;

export default selectedPokemonEvoSlice.reducer;
