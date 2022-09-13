import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", async (url) => {
    try {
        const response = await fetch(`${url ? url : "https://pokeapi.co/api/v2/pokemon"}`);
        const data = await response.json()
        return data
    } catch(error) {
        throw Error(error)
    }
})

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemon: [],
        isLoading: true,
        error: null,
        currentPageUrl: "",
        prevPageUrl: "",
        nextPageUrl: ""
    },
    reducers: {
        updatePokemon: (state, action) => {
            state.pokemon = action.payload
        }
    },
    extraReducers: {
        [fetchPokemon.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchPokemon.fulfilled]: (state, action) => {
            state.pokemon = action.payload.results
            state.isLoading = false
            state.prevPageUrl = action.payload.previous
            state.nextPageUrl = action.payload.next
        },
        [fetchPokemon.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        }
    }
})

export const { updatePokemon } = pokemonSlice.actions

export default pokemonSlice.reducer