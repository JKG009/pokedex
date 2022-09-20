import { configureStore } from '@reduxjs/toolkit';
import { getSelectedPokemonEvoUrlReducer, pokemonSliceReducer, selectedPokemonInfoReducer } from '../features';

export const store = configureStore({
  reducer: {
    pokemonList: pokemonSliceReducer,
    selectedPokemonInfo: selectedPokemonInfoReducer,
    getSelectedPokemonEvoUrl: getSelectedPokemonEvoUrlReducer
  },
});
