import { useState, useEffect } from "react";
import axios from "axios";
import { capitaliseStr } from "../config";

const useFetchPokemonAbility = (abilityUrl) => {
  const [abilityName, setAbilityName] = useState("");
  const [abilityDetail, setAbilityDetail] = useState("");

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get(abilityUrl, { cancelToken: cancelToken.token })
      .then((response) => {
        setAbilityName(capitaliseStr(response.data.name));
        if (response.data.effect_entries[0].language.name === "en") {
          setAbilityDetail(response.data.effect_entries[0].effect);
        } else {
          setAbilityDetail(response.data.effect_entries[1].effect);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error);
        }
      });
    return () => {
      cancelToken.cancel();
    };
  }, [abilityUrl]);

  return { abilityName, abilityDetail };
};

export default useFetchPokemonAbility;
