import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEvolutionImgSrc,
  fetchEvoChainUrl,
  fetchEvoChainPokemons,
  removeEvoImgSrc,
  updateFirstImgSrc,
  updateSecondImgSrc,
  updateThirdImgSrc,
  updatePrevEvolutionUrl,
  removeName,
} from "../features/selectedPokemonEvo/selectedPokemonEvoSlice";
import { BASE_URL } from "../config";

const usePokemonEvo = () => {
  const dispatch = useDispatch();
  const { evolutionUrl, speciesUrl, prevEvolutionUrl } = useSelector(
    (state) => state.selectedPokemonEvo.url
  );

  // New
  // const evolutionNameDetails = useSelector(
  //   (state) => state.selectedPokemonEvo.evolutionNameDetails
  // );
  // console.log("NAMES", evolutionNameDetails);
  // const requests = evolutionNameDetails.map(
  //   (name) => `${BASE_URL}pokemon/${name}`
  // );
  // const evolutionImgSrc = useSelector(
  //   (state) => state.selectedPokemonEvo.evolutionImgSrc
  // );
  // // console.log("IMGS", evolutionImgSrc)

  // const getData = async () => {
  //   requests.map(async (request) => {
  //     const response = await axios.get(request);
  //     console.log(response);
  //     dispatch(
  //       updateEvolutionImgSrc(
  //         response.data.sprites.other[`official-artwork`].front_default
  //       )
  //     );
  //   });
  // };

  // useEffect(() => {
  //   if (evolutionImgSrc.length <= 0) {
  //     getData();
  //   }
  //   return () => {};
  // }, [evolutionNameDetails]);

  // Old
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
