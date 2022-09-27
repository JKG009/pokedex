import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PokemonAbility } from "../components";
import {
  fetchSelectedPokemon,
  removeSelectedPokemonInfo,
} from "../features/selectedPokemonInfo/selectedPokemonInfoSlice";
import { updateSelectedPokemonSpeciesUrl } from "../features/selectedPokemonEvo/selectedPokemonEvoSlice";
import { BASE_URL, capitaliseStr } from "../config";

const usePokemonInfo = () => {
  const dispatch = useDispatch();
  const { pokemonId } = useParams();
  const { info } = useSelector((state) => state.selectedPokemonInfo);

  const renderPokemonTypes = info.types?.map((type) => (
    <p key={type.type.name} className={type.type.name}>
      {capitaliseStr(type.type.name)}
    </p>
  ));

  const renderPokemonAbility = info.abilities?.map((ability) => (
    <PokemonAbility key={ability.name} abilityUrl={ability.ability.url} />
  ));

  // Uses useParams to allows user to type either the Pokemon's Id or name into the url on top of being directed onto page
  useEffect(() => {
    dispatch(fetchSelectedPokemon(`${BASE_URL}pokemon/${pokemonId}`));
    return () => {
      dispatch(removeSelectedPokemonInfo());
    };
  }, [dispatch, pokemonId]);

  useEffect(() => {
    dispatch(
      updateSelectedPokemonSpeciesUrl(`${BASE_URL}pokemon-species/${info.id}/`)
    );
  }, [dispatch, pokemonId, info.id]);

  return { renderPokemonTypes, renderPokemonAbility };
};

export default usePokemonInfo;
