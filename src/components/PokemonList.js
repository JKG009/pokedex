import React , { useEffect }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPokemon } from '../features/pokemon/pokemonSlice'

const PokemonList = () => {
    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.pokemonList.pokemon)
    const isLoading = useSelector(state => state.pokemonList.isLoading)
    // const prevUrl = useSelector(state => state.pokemonList.prevPageUrl)
    // const nextUrl = useSelector(state => state.pokemonList.nextPageUrl)
    // console.log(pokemon)
    // console.log(prevUrl, nextUrl)
    useEffect(() => dispatch(fetchPokemon()), [])

  return (
    <>
        <div>{isLoading ? <div>...loading</div> : pokemon.map(p => <div>{p.name}</div>)}</div>
    </>
  )
}

export default PokemonList