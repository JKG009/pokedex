import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvoChainUrl,
  fetchEvoChainPokemons,
  updatePrevEvolutionUrl,
} from "../features/selectedPokemonEvo/selectedPokemonEvoSlice";
import { capitaliseStr } from "../config";
import { Link } from "react-router-dom";

const usePokemonEvo = () => {
  const dispatch = useDispatch();
  const {
    pokemonEvoDetails: { evolutionPokemon },
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
    };
  }, [dispatch, prevEvolutionUrl, evolutionUrl]);

  const renderLinks = evolutionPokemon.map(({ name, url }) => (
    <Link key={name} className="evo--link" to={`/pokemon/${name}`}>
      <h3 className="evo--pokemon_name">{capitaliseStr(name)}</h3>
      <div className="evo--img_background">
        <img
          className="evo--img"
          alt={name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${url
            .replace(/\D/g, "")
            .slice(1)}.png`}
        />
      </div>
    </Link>
  ));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return renderLinks;
};

export default usePokemonEvo;