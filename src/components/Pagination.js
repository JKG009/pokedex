import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config";
import { fetchPokemonList } from "../features/pokemonList/pokemonListSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const {
    pokemonList,
    urls: { prevUrl, nextUrl },
  } = useSelector((state) => state.pokemonList);

  const [pokemonListLength, setPokemonListLength] = useState(
    pokemonList.length
  );

  return (
    <>
      <button
        disabled={!prevUrl}
        onClick={() => dispatch(fetchPokemonList(prevUrl))}
      >
        Previous Page
      </button>
      <label htmlFor="Pokemon List Length">Number of Pokemon</label>
      <select
        defaultValue={pokemonListLength}
        name="Pokemon List Length"
        id="Pokemon List Length"
        onChange={(e) => {
          setPokemonListLength(e.target.value);
        }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </select>
      <button
        onClick={() =>
          dispatch(
            fetchPokemonList(`${BASE_URL}pokemon/?limit=${pokemonListLength}`)
          )
        }
      >
        Set
      </button>
      <button
        disabled={!nextUrl}
        onClick={() => dispatch(fetchPokemonList(nextUrl))}
      >
        Next Page
      </button>
    </>
  );
};

export default Pagination;
