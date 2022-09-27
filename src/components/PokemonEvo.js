import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { capitaliseStr } from "../config";
import usePokemonEvo from "../hooks/usePokemonEvo";

const PokemonEvo = () => {
  const {
    firstEvoName,
    firstImgSrc,
    secondEvoName,
    secondImgSrc,
    thirdEvoName,
    thirdImgSrc,
  } = useSelector((state) => state.selectedPokemonEvo.pokemonEvoDetails);

  usePokemonEvo();

  return (
    <>
      <Link to={`/pokemon/${firstEvoName}`}>
        <img alt={firstEvoName} src={firstImgSrc} />
        <div>{capitaliseStr(firstEvoName)}</div>
      </Link>
      <Link to={`/pokemon/${secondEvoName}`}>
        <img alt={secondEvoName} src={secondImgSrc} />
        <div>{capitaliseStr(secondEvoName)}</div>
      </Link>
      {thirdEvoName && (
        <Link to={`/pokemon/${thirdEvoName}`}>
          <img alt={thirdEvoName} src={thirdImgSrc} />
          <div>{capitaliseStr(thirdEvoName)}</div>
        </Link>
      )}
    </>
  );
};

export default PokemonEvo;
