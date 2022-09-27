import { useState } from "react";
import axios from "axios";
import { capitaliseStr } from "../config";

const useFetchPokemonAbility = () => {
  const [abilityName, setAbilityName] = useState("");
  const [abilityDetail, setAbilityDetail] = useState("");

  const fetchPokemonAbility = async (url) => {
    const response = await axios.get(url).catch((error) => console.log(error));
    setAbilityName(capitaliseStr(response.data.name));
    if (response.data.effect_entries[0].language.name === "en") {
      setAbilityDetail(response.data.effect_entries[0].effect);
    } else {
      setAbilityDetail(response.data.effect_entries[1].effect);
    }
  };

  return { abilityName, abilityDetail, fetchPokemonAbility };
};

export default useFetchPokemonAbility;
