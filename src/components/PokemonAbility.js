import React from "react";
import useFetchPokemonAbility from "../hooks/useFetchPokemonAbility";
import "../styles/pokemonAbility.css";

const PokemonAbility = ({ abilityUrl }) => {
  const { abilityDetail, abilityName } = useFetchPokemonAbility(abilityUrl);

  return (
    <>
    <div className="ability--container">
      <h3 className="ability--name">{abilityName}</h3>
      <div className="ability--ability">{abilityDetail}</div>
    </div>
    </> );
};

export default PokemonAbility;
