import { useEffect } from "react";
import axios from "axios";
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
import { BASE_URL } from "../config";

const usePokemonEvo = () => {
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

  const requestOne = firstEvoName ? `${BASE_URL}pokemon/${firstEvoName}` : null;
  const requestTwo = secondEvoName
    ? `${BASE_URL}pokemon/${secondEvoName}`
    : null;
  const requestThree = thirdEvoName
    ? `${BASE_URL}pokemon/${thirdEvoName}`
    : null;

  useEffect(() => {
    requestOne && fetchPokemonEvo(requestOne, updateFirstImgSrc);
    requestTwo && fetchPokemonEvo(requestTwo, updateSecondImgSrc);
    requestThree && fetchPokemonEvo(requestThree, updateThirdImgSrc);
  }, [requestOne, requestTwo, requestThree]);

  const fetchPokemonEvo = async (url, action) => {
    const response = await axios.get(url).catch((error) => console.log(error));
    dispatch(
      action(response.data.sprites.other[`official-artwork`].front_default)
    );
  };

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

  return { requestOne, requestTwo, requestThree, fetchPokemonEvo };
};

export default usePokemonEvo;
