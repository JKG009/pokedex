import React, { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPokemonEvoChainUrl,
  fetchPokemonEvoChain,
  removeEvo,
  updateFirstImgSrc,
  updateSecondImgSrc,
  updateThirdImgSrc,
} from "../features/getSelectedPokemonEvoUrl/getSelectedPokemonEvoUrlSlice";

const PokemonEvo = () => {
  const dispatch = useDispatch();
  const pokemonEvoUrl = useSelector(
    (state) => state.getSelectedPokemonEvoUrl.evolutionUrl
  );
  const speciesUrl = useSelector(
    (state) => state.getSelectedPokemonEvoUrl.speciesUrl
  );
  const firstName = useSelector(
    (state) => state.getSelectedPokemonEvoUrl.firstEvoName
  );
  const secondName = useSelector(
    (state) => state.getSelectedPokemonEvoUrl.secondEvoName
  );
  const thirdName = useSelector(
    (state) => state.getSelectedPokemonEvoUrl.thirdEvoName
  );
  const firstImgSrc = useSelector(
    (state) => state.getSelectedPokemonEvoUrl.firstImgSrc
  );
  const secondImgSrc = useSelector(
    (state) => state.getSelectedPokemonEvoUrl.secondImgSrc
  );
  const thirdImgSrc = useSelector(
    (state) => state.getSelectedPokemonEvoUrl.thirdImgSrc
  );

  const firstPhoto = `https://pokeapi.co/api/v2/pokemon/${firstName}`;
  const secondPhoto = `https://pokeapi.co/api/v2/pokemon/${secondName}`;
  const thirdPhoto = thirdName
    ? `https://pokeapi.co/api/v2/pokemon/${thirdName}`
    : null;

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

        responseThree
          ? dispatch(
              updateThirdImgSrc(
                responseThree.sprites.other[`official-artwork`].front_default
              )
            )
          : dispatch(updateThirdImgSrc(""));
      })
    )
    .catch((error) => {
      console.log(error);
    });

  useEffect(() => {
    dispatch(fetchPokemonEvoChainUrl(speciesUrl));
  }, [dispatch, speciesUrl]);

  useEffect(() => {
    dispatch(fetchPokemonEvoChain(pokemonEvoUrl));
    return () => {
      dispatch(removeEvo());
    };
  }, [dispatch, pokemonEvoUrl]);

  return (
    <>
      <Link to={`/pokemon/${firstName}`}>
        <img alt="" src={firstImgSrc} />
        <div>{firstName}</div>
      </Link>
      <Link to={`/pokemon/${secondName}`}>
        <img alt="" src={secondImgSrc} />
        <div>{secondName}</div>
      </Link>
      {thirdName && (
        <Link to={`/pokemon/${thirdName}`}>
          <img alt="" src={thirdImgSrc} />
          <div>{thirdName}</div>
        </Link>
      )}
    </>
  );
};

export default PokemonEvo;
