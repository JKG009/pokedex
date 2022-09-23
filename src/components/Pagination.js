import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../features/pokemonList/pokemonListSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { prevUrl, nextUrl } = useSelector((state) => state.pokemonList.urls);
  const prevPage = () => {
    dispatch(fetchPokemonList(prevUrl));
  };
  const nextPage = () => {
    dispatch(fetchPokemonList(nextUrl));
  };

  return (
    <>
      <button disabled={!prevUrl} onClick={prevPage}>
        Previous Page
      </button>
      <button disabled={!nextUrl} onClick={nextPage}>
        Next Page
      </button>
    </>
  );
};

export default Pagination;