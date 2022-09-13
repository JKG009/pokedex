import React , { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { fetchPokemon } from '../features/pokemon/pokemonSlice'
import Pagination from './Pagination'

const PokemonList = () => {
  const dispatch = useDispatch()
  const pokemonList = useSelector(state => state.pokemonList.pokemon)
  const isLoading = useSelector(state => state.pokemonList.isLoading)

  useEffect(() => {
    if(pokemonList.length === 0){
      dispatch(fetchPokemon())
    }
  }, [dispatch, pokemonList])

  const renderList = pokemonList.map(pokemon => (
  <Link 
    key={pokemon.name} 
    to={`/pokemon/${pokemon.name}`} 
    state={{pokemon}}>
      {pokemon.name}
  </Link>
))
    
  return (
    <div>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <>
          {renderList}
          <Pagination />
        </>
      )}
    </div>
  );
}

export default PokemonList


