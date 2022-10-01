import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { capitaliseStr } from "../config";
import usePokemonEvo from "../hooks/usePokemonEvo";
import "../styles/pokemonEvo.css";

const PokemonEvo = () => {
  const {
    firstEvoName,
    firstImgSrc,
    secondEvoName,
    secondImgSrc,
    thirdEvoName,
    thirdImgSrc,
  } = useSelector((state) => state.selectedPokemonEvo.pokemonEvoDetails);

  // const evolutionNameDetails = useSelector(state => state.selectedPokemonEvo.evolutionNameDetails)

  // const evolutionImgSrc = useSelector(state => state.selectedPokemonEvo.evolutionImgSrc)

  usePokemonEvo();

  return (
    <>
      <h2 className="evo--title">Evolutions</h2>
      <div className="evo--link_container">
        <Link className="evo--link" to={`/pokemon/${firstEvoName}`}>
          <h3 className="evo--pokemon_name">
            {capitaliseStr(firstEvoName)}
          </h3>
          <div className="evo--img_background">
            <img className="evo--img" alt={firstEvoName} src={firstImgSrc} />
          </div>
        </Link>
        <Link className="evo--link" to={`/pokemon/${secondEvoName}`}>
          <h3 className="evo--pokemon_name">
            {capitaliseStr(secondEvoName)}
          </h3>
          <div className="evo--img_background">
            <img className="evo--img" alt={secondEvoName} src={secondImgSrc} />
          </div>
        </Link>
        {thirdEvoName && (
          <Link className="evo--link" to={`/pokemon/${thirdEvoName}`}>
            <h3 className="evo--pokemon_name">
              {capitaliseStr(thirdEvoName)}
            </h3>
            <div className="evo--img_background">
              <img className="evo--img" alt={thirdEvoName} src={thirdImgSrc} />
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default PokemonEvo;
