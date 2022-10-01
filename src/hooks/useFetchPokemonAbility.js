import { useState, useEffect } from "react";
import axios from "axios";
import { capitaliseStr } from "../config";

const useFetchPokemonAbility = (abilityUrl) => {
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

  useEffect(() => {
    fetchPokemonAbility(abilityUrl);
  }, [abilityUrl]);

  return { abilityName, abilityDetail };
};

export default useFetchPokemonAbility;
