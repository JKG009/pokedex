import React from "react";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import usePokemonList from "../hooks/usePokemonList";

const PokemonList = () => {
  const { isLoading } = useSelector((state) => state.pokemonList);
  const renderPokemonList = usePokemonList();

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
