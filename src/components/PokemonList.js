import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemonList } from "../features/pokemonList/pokemonListSlice";
import Pagination from "./Pagination";

const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemonList, isLoading } = useSelector((state) => state.pokemonList);
  
  // Fetches new Pokemon list on first load, allow loaded list to be unchanged for "Back" button usage
  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList());
    }
  }, [dispatch, pokemonList]);

  const renderPokemonList = pokemonList.map((pokemon) => (
    <Link style={{display: "flex"}} key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
      {pokemon.name}
    </Link>
  ));

  return (
    <div>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <>
          {renderPokemonList}
          <Pagination />
        </>
      )}
    </div>
  );
};

export default PokemonList;