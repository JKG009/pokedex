import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEvolutionImgSrc,
  fetchEvoChainUrl,
  fetchEvoChainPokemons,
  removeEvoImgSrc,
  updatePrevEvolutionUrl,
} from "../features/selectedPokemonEvo/selectedPokemonEvoSlice";
import { BASE_URL, capitaliseStr, combineArrays } from "../config";
import { Link } from "react-router-dom";

const usePokemonEvo = () => {
  const dispatch = useDispatch();
  const [prevPoke, setPrevPoke] = useState([]);
  const {
    pokemonEvoDetails: { evolutionNameDetails, evolutionImgSrc },
    url: { evolutionUrl, speciesUrl, prevEvolutionUrl },
  } = useSelector((state) => state.selectedPokemonEvo);

  // Fetches the evolution url with the results from speciesUrl(PokemonInfo)
  useEffect(() => {
    if (!speciesUrl.includes(undefined)) {
      dispatch(fetchEvoChainUrl(speciesUrl));
    }
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

  const fetchPokemonEvoImgSrcs = async (requests) => {
    requests.map(async (request) => {
      const response = await axios.get(request);
      dispatch(
        updateEvolutionImgSrc(
          response.data.sprites.other[`official-artwork`].front_default
        )
      );
    });
  };

  // Runs third, fetches the src of the Pokemon names array before sorting them into order based on the Pokemon's ID before rendering the data into Links
  useEffect(() => {
    if (evolutionNameDetails[0] !== prevPoke[0]) {
      const requests = evolutionNameDetails.map(
        (name) => `${BASE_URL}pokemon/${name}`
      );
      setPrevPoke(requests);
      fetchPokemonEvoImgSrcs(requests);
    }
  }, [evolutionNameDetails]);

  const evoImgSrcInOrder = evolutionImgSrc
    .map((src) => src.replace(/\D/g, ""))
    .sort((a, b) => a - b)
    .map(
      (src) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${src}.png`
    );

  const combinedPokemonObject = combineArrays(
    evolutionNameDetails,
    evoImgSrcInOrder
  );

  const namesArr = Object.keys(combinedPokemonObject);
  const urlArr = Object.values(combinedPokemonObject);

  const renderLinks = namesArr.map((name, index) => (
    <Link key={name} className="evo--link" to={`/pokemon/${name}`}>
      <h3 className="evo--pokemon_name">{capitaliseStr(name)}</h3>
      <div className="evo--img_background">
        <img className="evo--img" alt={name} src={urlArr[index]} />
      </div>
    </Link>
  ));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return renderLinks;
};

export default usePokemonEvo;
