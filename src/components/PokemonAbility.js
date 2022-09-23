import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { capitaliseStr } from "../config";

const PokemonAbility = ({ abilityUrl }) => {
  const { pokemonId } = useParams();
  const [abilityName, setAbilityName] = useState("");
  const [abilityDetail, setAbilityDetail] = useState("");

  const fetchPokemonAbility = async (url) => {
    const response = await axios.get(url).catch((error) => console.log(error));
    setAbilityName(response.data.name);
    if (response.data.effect_entries[0].language.name === "en") {
      setAbilityDetail(response.data.effect_entries[0].effect);
    } else {
      setAbilityDetail(response.data.effect_entries[1].effect);
    }
  };

  useEffect(() => {
    fetchPokemonAbility(abilityUrl);
  }, [pokemonId, abilityUrl]);

  return (
    <div>
      <h3>{capitaliseStr(abilityName)}</h3>
      <div>{abilityDetail}</div>
    </div>
  );
};

export default PokemonAbility;
