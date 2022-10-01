import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config";
import { fetchPokemonList } from "../features/pokemonList/pokemonListSlice";
import "../styles/pagination.css"

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
    <div className="pagination--container">
      <button
        className="pagination--button"
        disabled={!prevUrl}
        onClick={() => dispatch(fetchPokemonList(prevUrl))}
      >
        Previous Page
      </button>
      <div className="pagination--input_container">
        <label className="pagination--label" htmlFor="Pokemon List Length">Number of Pokemon Displayed</label>
        <select
          className="pagination--input"
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
          className="pagination--button"
          onClick={() =>
            dispatch(
              fetchPokemonList(`${BASE_URL}pokemon/?limit=${pokemonListLength}`)
            )
          }
        >
          Set
        </button>
      </div>
      <button
        className="pagination--button"
        disabled={!nextUrl}
        onClick={() => dispatch(fetchPokemonList(nextUrl))}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
