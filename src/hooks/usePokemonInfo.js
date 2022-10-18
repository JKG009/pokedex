import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PokemonAbility } from "../components";
import {
  fetchSelectedPokemon,
  removeSelectedPokemonInfo,
} from "../features/selectedPokemonInfo/selectedPokemonInfoSlice";
import {
  removeSelectedPokemonSpeciesUrl,
  updateSelectedPokemonSpeciesUrl,
} from "../features/selectedPokemonEvo/selectedPokemonEvoSlice";
import { BASE_URL, capitaliseStr } from "../config";
import "../styles/pokemonType.css";

const usePokemonInfo = () => {
  const dispatch = useDispatch();
  const { pokemonId } = useParams();
  const { info } = useSelector((state) => state.selectedPokemonInfo);

  const renderPokemonTypes = info.types?.map((type) => (
    <div
      key={type.type.name}
      className={`info--type_icon info--type_${type.type.name}`}
    >
      {capitaliseStr(type.type.name)}
    </div>
  ));

  const renderPokemonAbility = info.abilities?.map((ability) => (
    <PokemonAbility key={ability.name} abilityUrl={ability.ability.url} />
  ));

  // Passing pokemonList.url from pokemonList page to fetch data would not allow url to be typed manually. Therefore useParams is used.
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
    return () => {
      dispatch(removeSelectedPokemonSpeciesUrl());
    };
  }, [dispatch, info.id]);

  return { renderPokemonTypes, renderPokemonAbility };
};

export default usePokemonInfo;
