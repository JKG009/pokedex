import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemonEvoChainUrl = createAsyncThunk("getSelectedPokemonEvoUrl/fetchPokemonEvoChainUrl", async(url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(error) {
        throw Error(error)
    }
})

export const fetchPokemonEvoChain = createAsyncThunk(
    "getSelectedPokemonEvoUrl/fetchPokemonEvoChain", async(url) => {
        try {
            const response = await fetch(url);
            const data = await response.json()
            return data
        } catch(error) {
            console.log(error)
        }
    }
)

export const getSelectedPokemonEvoUrlSlice = createSlice({
    name: "selected pokemon species",
    initialState: {
        isLoading: true,
        speciesUrl: "",
        evolutionUrl: "",
        firstEvo: "",
        secondEvo: "",
        thirdEvo: undefined,
        error: null
    },
    reducers: {
        updateGetSelectedPokemonSpeciesUrl: (state, action) => {
            state.speciesUrl = action.payload
        },
        updateGetSelectedPokemonEvoUrl: (state, action) => {
            state.evolutionUrl = action.payload
        }
    },
    extraReducers: {
        [fetchPokemonEvoChainUrl.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchPokemonEvoChainUrl.fulfilled]: (state, action) => {
            state.isLoading = false
            state.evolutionUrl = action.payload.evolution_chain.url
        },
        [fetchPokemonEvoChainUrl.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        },
        [fetchPokemonEvoChain.pending]: (state, action) => {
            
        },
        [fetchPokemonEvoChain.fulfilled]: (state, action) => {
            state.firstEvo = action.payload.chain.species.name
            state.secondEvo = action.payload.chain.evolves_to[0].species.name
            state.thirdEvo = action.payload.chain.evolves_to[0].evolves_to[0].species.name
        },
        [fetchPokemonEvoChain.rejected]: (state, action) => {

        }
    }
})

export const { updateGetSelectedPokemonEvoUrl, updateGetSelectedPokemonSpeciesUrl } = getSelectedPokemonEvoUrlSlice.actions

export default getSelectedPokemonEvoUrlSlice.reducer