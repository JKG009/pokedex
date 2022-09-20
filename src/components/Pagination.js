import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemon } from '../features/pokemon/pokemonSlice'

const Pagination = () => {
  const dispatch = useDispatch()
  const prevPageUrl = useSelector(state => state.pokemonList.prevPageUrl )
  const nextPageUrl = useSelector(state => state.pokemonList.nextPageUrl)
  const prevPage = () => {
    dispatch(fetchPokemon(prevPageUrl))
  }
  const nextPage = () => {
    dispatch(fetchPokemon(nextPageUrl))
  }

  return (
    <>
      <button disabled={!prevPageUrl} onClick={() => prevPage()}>prevPage</button>
      <button disabled={!nextPageUrl} onClick={() => nextPage()}>nextPage</button>
    </>
  )
}

export default Pagination