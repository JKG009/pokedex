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
  // console.log(nextPageUrl, prevPageUrl)

  return (
    <>
      <button onClick={() => prevPage()}>prevPage</button>
      <button onClick={() => nextPage()}>nextPage</button>
    </>
  )
}

export default Pagination