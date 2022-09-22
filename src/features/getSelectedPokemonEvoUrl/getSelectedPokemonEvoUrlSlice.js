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
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch(error) {
            console.log(error)
        }
    }
)

const initialState = {
        isLoading: true,
        speciesUrl: "",
        evolutionUrl: "",
        firstEvoName: "",
        firstImgSrc: "",
        secondEvoName: "",
        secondImgSrc: "",
        thirdEvoName: undefined,
        thirdImgSrc: "",
        error: null
    }

export const getSelectedPokemonEvoUrlSlice = createSlice({
    name: "selected pokemon species",
    initialState,
    reducers: {
        updateGetSelectedPokemonSpeciesUrl: (state, action) => {
            state.speciesUrl = action.payload
        },
        updateGetSelectedPokemonEvoUrl: (state, action) => {
            state.evolutionUrl = action.payload
        },
        removeEvo: (state, action) => {
            state.firstEvoName = ""
            state.secondEvoName = ""
            state.thirdEvoName = ""
        },
        updateFirstImgSrc: (state, action) => {
            state.firstImgSrc = action.payload
        },
        updateSecondImgSrc: (state, action) => {
            state.secondImgSrc = action.payload
        },
        updateThirdImgSrc: (state, action) => {
            state.thirdImgSrc = action.payload
        },
        resetEvoSlice: () => initialState
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
            state.firstEvoName = action.payload.chain.species.name
            state.secondEvoName = action.payload.chain.evolves_to[0].species.name
            state.thirdEvoName = action.payload.chain.evolves_to[0].evolves_to[0]?.species.name
        },
        [fetchPokemonEvoChain.rejected]: (state, action) => {

        }
    }
})

export const { updateGetSelectedPokemonEvoUrl, updateGetSelectedPokemonSpeciesUrl, removeEvo,updateFirstImgSrc, updateSecondImgSrc, updateThirdImgSrc, resetEvoSlice } = getSelectedPokemonEvoUrlSlice.actions

export default getSelectedPokemonEvoUrlSlice.reducer