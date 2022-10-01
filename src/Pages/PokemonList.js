import React from "react";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import usePokemonList from "../hooks/usePokemonList";
import "../styles/pokemonList.css";

const PokemonList = () => {
  const { isLoading } = useSelector((state) => state.pokemonList);
  const renderPokemonList = usePokemonList();

  return (
    <div>
      {isLoading ? (
        <div className="blank_page">
          <p className="loading">...loading</p>
        </div>
      ) : (
        <div className="blank_page">
          <Pagination />
          <div className="list--link_container"> {renderPokemonList}</div>
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default PokemonList;
