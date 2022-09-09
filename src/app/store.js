import { configureStore } from '@reduxjs/toolkit';
import { pokemonSliceReducer } from '../features';

export const store = configureStore({
  reducer: {
    pokemonList: pokemonSliceReducer
  },
});
