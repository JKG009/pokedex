import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { fetchSelectedPokemon, removeSelectedPokemonInfo } from '../features/selectedPokemonInfo/selectedPokemonInfoSlice'
import { useDispatch, useSelector } from 'react-redux'
import {PokemonEvo, PokemonAbility} from './index'
import { updateGetSelectedPokemonSpeciesUrl, resetEvoSlice } from '../features/getSelectedPokemonEvoUrl/getSelectedPokemonEvoUrlSlice'

const PokemonInfo = () => {
  const dispatch = useDispatch()
  // const location = useLocation()
  // const selectedPokemon = location.state.pokemon
  const { pokemonId } = useParams()
  const info = useSelector(state => state.selectedPokemonInfo.info)

  const renderPokemonTypes = info.types?.map(type => <p key={type.type.name} className={type.type.name}>{type.type.name}</p>)

  const renderPokemonAbility = info.abilities?.map(ability => <PokemonAbility ability={ability}/>)

  useEffect(() => {
      dispatch(fetchSelectedPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`))
    return () => {
      dispatch(removeSelectedPokemonInfo())
    }
  }, [dispatch, pokemonId])

  useEffect(() => {
    dispatch(
      updateGetSelectedPokemonSpeciesUrl(
        `https://pokeapi.co/api/v2/pokemon-species/${info.id}/`
      )
    )
  }, [dispatch, pokemonId, info.id])

  return (
    <>
      <Link onClick={() => dispatch(resetEvoSlice())} to={`/`}>Back</Link>
      <div>
        <div>
          <div>
            <div>
              <h3>{info.name}</h3>
              <h3>{info.id}</h3>
            </div>
            <div>
              <img
                alt="pokemon"
                src={
                  info.sprites &&
                  info.sprites.other[`official-artwork`].front_default
                }
              />
            </div>
          </div>
          <div></div>
        </div>
        <div>
          <table>
            <tr>
              <th>Stat</th>
              {info.stats?.map((stat) => (
                <td key={stat.stat.name}>{stat.stat.name}</td>
              ))}
            </tr>
            <tr>
              <th>Value</th>
              {info.stats?.map((stat) => (
                <td key={`${stat.stat.name} stat`}>{stat.base_stat}</td>
              ))}
            </tr>
          </table>
          <div>
            <div>{renderPokemonTypes}</div>
          </div>
        </div>
      </div>
      <div>{renderPokemonAbility}</div>
      <div>
        <PokemonEvo  />
      </div>
    </>
  );
}

export default PokemonInfo