import { configureStore } from '@reduxjs/toolkit';
import { pokemonSliceReducer, selectedPokemonInfoReducer } from '../features';

export const store = configureStore({
  reducer: {
    pokemonList: pokemonSliceReducer,
    selectedPokemonInfo: selectedPokemonInfoReducer
  },
});
