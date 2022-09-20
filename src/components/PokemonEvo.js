import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemonEvoChainUrl, fetchPokemonEvoChain } from '../features/getSelectedPokemonEvoUrl/getSelectedPokemonEvoUrlSlice'

const PokemonEvo = () => {
  const dispatch = useDispatch()
    const pokemonEvoUrl = useSelector(state => state.getSelectedPokemonEvoUrl.evolutionUrl)
    const speciesUrl = useSelector(state => state.getSelectedPokemonEvoUrl.speciesUrl)
    const first = useSelector(state => state.getSelectedPokemonEvoUrl.firstEvo)
    const second = useSelector(state => state.getSelectedPokemonEvoUrl.secondEvo)
    const third = useSelector(state => state.getSelectedPokemonEvoUrl.thirdEvo)

    useEffect(() => {
      dispatch(fetchPokemonEvoChainUrl(speciesUrl))
    }, [dispatch, speciesUrl])

    useEffect(() => {
      dispatch(fetchPokemonEvoChain(pokemonEvoUrl));
    }, [pokemonEvoUrl]);
    
  return (
    <>
      <div>{pokemonEvoUrl}</div>
      <div>{speciesUrl}</div>
      <div>{first}</div>
      <div>{second}</div>
      <div>{third}</div>
    </>
  );
}

export default PokemonEvo