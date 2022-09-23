import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvoChainUrl,
  fetchEvoChainPokemons,
  removeEvoImgSrc,
  updateFirstImgSrc,
  updateSecondImgSrc,
  updateThirdImgSrc,
  updatePrevEvolutionUrl,
} from "../features/selectedPokemonEvo/selectedPokemonEvoSlice";
import { BASE_URL, capitaliseStr } from "../config";

const PokemonEvo = () => {
  const dispatch = useDispatch();
  const { evolutionUrl, speciesUrl, prevEvolutionUrl } = useSelector(
    (state) => state.selectedPokemonEvo.url
  );
  const {
    firstEvoName,
    firstImgSrc,
    secondEvoName,
    secondImgSrc,
    thirdEvoName,
    thirdImgSrc,
  } = useSelector((state) => state.selectedPokemonEvo.pokemonEvoDetails);

  const firstPhoto = `${BASE_URL}pokemon/${firstEvoName}`;
  const secondPhoto = `${BASE_URL}pokemon/${secondEvoName}`;
  const thirdPhoto = thirdEvoName ? `${BASE_URL}pokemon/${thirdEvoName}` : null;

  const requestOne = axios.get(firstPhoto);
  const requestTwo = axios.get(secondPhoto);
  const requestThree = thirdPhoto !== null && axios.get(thirdPhoto);

  Promise.all([requestOne, requestTwo, requestThree])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0].data;
        const responseTwo = responses[1].data;
        const responseThree = responses[2].data;

        dispatch(
          updateFirstImgSrc(
            responseOne.sprites.other[`official-artwork`].front_default
          )
        );

        dispatch(
          updateSecondImgSrc(
            responseTwo.sprites.other[`official-artwork`].front_default
          )
        );

        responseThree &&
          dispatch(
            updateThirdImgSrc(
              responseThree.sprites?.other[`official-artwork`].front_default
            )
          );
      })
    )
    .catch((error) => {
      console.log(error);
    });

  // Fetches the evolution url with the results from speciesUrl(PokemonInfo)
  useEffect(() => {
    dispatch(fetchEvoChainUrl(speciesUrl));
  }, [dispatch, speciesUrl]);

  // Runs second, after fetchEvoChainUrl to fetch the individual pokemon of that evolution chain
  useEffect(() => {
    if (prevEvolutionUrl !== evolutionUrl) {
      dispatch(updatePrevEvolutionUrl(evolutionUrl));
      dispatch(fetchEvoChainPokemons(evolutionUrl));
    }
    return () => {
      dispatch(removeEvoImgSrc());
    };
  }, [dispatch, prevEvolutionUrl, evolutionUrl]);

  return (
    <>
      <Link to={`/pokemon/${firstEvoName}`}>
        <img alt={firstEvoName} src={firstImgSrc} />
        <div>{capitaliseStr(firstEvoName)}</div>
      </Link>
      <Link to={`/pokemon/${secondEvoName}`}>
        <img alt={secondEvoName} src={secondImgSrc} />
        <div>{capitaliseStr(secondEvoName)}</div>
      </Link>
      {thirdEvoName && (
        <Link to={`/pokemon/${thirdEvoName}`}>
          <img alt={thirdEvoName} src={thirdImgSrc} />
          <div>{capitaliseStr(thirdEvoName)}</div>
        </Link>
      )}
    </>
  );
};

export default PokemonEvo;
