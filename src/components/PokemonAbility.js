import React, { useEffect } from "react";
import useFetchPokemonAbility from "../hooks/useFetchPokemonAbility";

const PokemonAbility = ({ abilityUrl }) => {
  const { abilityDetail, abilityName, fetchPokemonAbility } =
    useFetchPokemonAbility();

  useEffect(() => {
    fetchPokemonAbility(abilityUrl);
  }, [abilityUrl, fetchPokemonAbility]);

  return (
    <div>
      <h3>{abilityName}</h3>
      <div>{abilityDetail}</div>
    </div>
  );
};

export default PokemonAbility;
