import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PokemonEvo, PokemonAbility } from "./index";
import {
  fetchSelectedPokemon,
  removeSelectedPokemonInfo,
} from "../features/selectedPokemonInfo/selectedPokemonInfoSlice";
import {
  updateSelectedPokemonSpeciesUrl,
  resetEvoSlice,
} from "../features/selectedPokemonEvo/selectedPokemonEvoSlice";
import { BASE_URL, capitaliseStr } from "../config";

const PokemonInfo = () => {
  const dispatch = useDispatch();
  const { pokemonId } = useParams();
  const { isLoading, info } = useSelector((state) => state.selectedPokemonInfo);

  const renderPokemonTypes = info.types?.map((type) => (
    <p key={type.type.name} className={type.type.name}>
      {capitaliseStr( type.type.name)}
    </p>
  ));

  const renderPokemonAbility = info.abilities?.map((ability) => (
    <PokemonAbility key={ability.name} abilityUrl={ability.ability.url} />
  ));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pokemonId]);

  // Uses useParams to allows user to type either the Pokemon's Id or name into the url on top of being directed onto page
  useEffect(() => {
    dispatch(fetchSelectedPokemon(`${BASE_URL}pokemon/${pokemonId}`));
    return () => {
      dispatch(removeSelectedPokemonInfo());
    };
  }, [dispatch, pokemonId]);

  useEffect(() => {
    dispatch(
      updateSelectedPokemonSpeciesUrl(`${BASE_URL}pokemon-species/${info.id}/`)
    );
  }, [dispatch, pokemonId, info.id]);

  return isLoading ? (
    <div>Loading Pokemon...</div>
  ) : info.name ? (
    <div>
      <div>
        <Link to={info.id !== 1 && `/pokemon/${info.id - 1}`}>
          Previous Pokemon
        </Link>
        <Link onClick={() => dispatch(resetEvoSlice())} to={`/`}>
          Back
        </Link>
        <Link to={info.id !== 905 && `/pokemon/${info.id + 1}`}>
          {" "}
          Next Pokemon{" "}
        </Link>
      </div>
      <div>
        <div>
          <div>
            <div>
              <h3>{capitaliseStr(info.name)}</h3>
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
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Stat</th>
                {info.stats?.map((stat) => (
                  <td key={stat.stat.name}>{stat.stat.name}</td>
                ))}
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>Value</th>
                {info.stats?.map((stat) => (
                  <td key={`${stat.stat.name} stat`}>{stat.base_stat}</td>
                ))}
              </tr>
            </tbody>
          </table>
          <div>
            <div>{renderPokemonTypes}</div>
          </div>
        </div>
      </div>
      <div>{renderPokemonAbility}</div>
      <div>
        <PokemonEvo />
      </div>
    </div>
  ) : (
    <div>
      <p>Not a pokemon name or Id</p>
      <Link to={`/`}>Click here to go home</Link>
    </div>
  );
};

export default PokemonInfo;
