import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../features/pokemonList/pokemonListSlice";
import { capitaliseStr, appendHashToId } from "../config";

const usePokemonList = () => {
  const dispatch = useDispatch();
  const { pokemonList } = useSelector((state) => state.pokemonList);

  // Fetches new Pokemon list on first load, allow loaded list to be unchanged for "Back" button usage
  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList());
    }
  }, [dispatch, pokemonList]);

  const renderPokemonList = pokemonList.map((pokemon) => {
    const pokemonId = pokemon.url.replace(/\D/g, "").substring(1);
    return (
      <Link
        className="list--link"
        key={pokemon.name}
        to={`/pokemon/${pokemon.name}`}
      >
        <p className="list--id">{appendHashToId(pokemonId)}</p>
        <img
        className="list--img"
          alt=""
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
        />
        <p className="list--name">
          {capitaliseStr(pokemon.name)}
        </p>
      </Link>
    );
  });

  return renderPokemonList;
};

export default usePokemonList;
