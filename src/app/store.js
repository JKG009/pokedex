import { configureStore } from '@reduxjs/toolkit';
import { selectedPokemonEvoReducer, pokemonListSliceReducer, selectedPokemonInfoReducer } from '../features';

export const store = configureStore({
  reducer: {
    pokemonList: pokemonListSliceReducer,
    selectedPokemonInfo: selectedPokemonInfoReducer,
    selectedPokemonEvo: selectedPokemonEvoReducer
  },
});
