import React from "react";
import usePokemonEvo from "../hooks/usePokemonEvo";
import "../styles/pokemonEvo.css";

const PokemonEvo = () => {
  const renderLinks = usePokemonEvo();

  return (
    <>
      <h2 className="evo--title">Evolutions</h2>
      <div
        className={`evo--link_container ${
          renderLinks.length > 4 && "evo--link_large_container"
        }`}
      >
        {renderLinks}
      </div>
    </>
  );
};

export default PokemonEvo;
