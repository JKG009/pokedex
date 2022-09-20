import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PokemonAbility = ({ability}) => {
    const [abilityName, setAbilityName] = useState("")
    const [abilityDetail, setAbilityDetail] = useState("")

    const fetchPokemonAbility = async(url) => {
        const response = await axios
            .get(url)
            .catch((error) => 
                console.log(error)
            )
        setAbilityName(response.data.name)
        if (response.data.effect_entries[0].language.name === "en") {
            setAbilityDetail(response.data.effect_entries[0].effect)
        } else {
            setAbilityDetail(response.data.effect_entries[1].effect)
        }
    }
    
    useEffect(() => {
      fetchPokemonAbility(ability.ability.url);
    }, [ability.ability.url]);
    
  return (
    <div>
      <div>{abilityName}</div>
      <div>{abilityDetail}</div>
    </div>
  )
}

export default PokemonAbility