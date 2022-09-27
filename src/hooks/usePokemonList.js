import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../features/pokemonList/pokemonListSlice";
import { capitaliseStr } from "../config";

const usePokemonList = () => {
  const dispatch = useDispatch();
  const { pokemonList } = useSelector((state) => state.pokemonList);

  // Fetches new Pokemon list on first load, allow loaded list to be unchanged for "Back" button usage
  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList());
    }
  }, [dispatch, pokemonList]);

  const renderPokemonList = pokemonList.map((pokemon) => (
    <Link
      style={{ display: "flex" }}
      key={pokemon.name}
      to={`/pokemon/${pokemon.name}`}
    >
      {capitaliseStr(pokemon.name)}
    </Link>
  ));

  return renderPokemonList;
};

export default usePokemonList;
