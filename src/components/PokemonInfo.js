import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { fetchSelectedPokemon, removeSelectedPokemonInfo } from '../features/selectedPokemonInfo/selectedPokemonInfoSlice'


import { useDispatch, useSelector } from 'react-redux'

const PokemonInfo = () => {
  const dispatch = useDispatch()
  // const location = useLocation()
  // const selectedPokemon = location.state.pokemon
  const { pokemonId } = useParams()
  const info = useSelector(state => state.selectedPokemonInfo.info)

  useEffect(() => {
      dispatch(fetchSelectedPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`))
    return () => {
      dispatch(removeSelectedPokemonInfo())
    }
  }, [dispatch, pokemonId])

  return (
    <>
      <Link to={`/`}>Back</Link>
      <h3>{pokemonId}</h3>
      {/* <img alt="pokemon" src={info.sprites.other[`official-artwork`].front_default} /> */}
      <table>
          <tr>
              <th>Stat</th>
              {info.stats?.map(stat => <td key={stat.stat.name}>{stat.stat.name}</td>)}
          </tr>
          <tr>
              <th>Value</th>
              {info.stats?.map(stat => <td key={`${stat.stat.name} stat`}>{stat.base_stat}</td>)}
          </tr>
      </table>
    </>
  )
}

export default PokemonInfo