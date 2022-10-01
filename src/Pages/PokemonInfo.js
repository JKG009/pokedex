import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PokemonEvo } from "../components/index";
import { appendHashToId, capitaliseStr } from "../config";
import { PSYDUCK_IMG_URL } from "../config";
import usePokemonInfo from "../hooks/usePokemonInfo";
import "../styles/pokemonInfo.css";

const PokemonInfo = () => {
  const { renderPokemonTypes, renderPokemonAbility } = usePokemonInfo();
  const { isLoading, info } = useSelector((state) => state.selectedPokemonInfo);
  const pokemonFlavorText = useSelector(
    (state) => state.selectedPokemonEvo.pokemonFlavorText
  );

  return isLoading ? (
    <div className="blank_page">
      <p className="loading">...loading</p>
    </div>
  ) : info.name ? (
    <div className="blank_page">
      <div className="info--link_container">
        <Link
          className={`info--link ${info.id === 1 && "info--link-disabled"}`}
          to={info.id !== 1 && `/pokemon/${info.id - 1}`}
        >
          Previous Pokemon
        </Link>
        <Link className="info--link" to={`/`}>
          Back
        </Link>
        <Link
          className={`info--link ${info.id === 905 && "info--link-disabled"}`}
          to={info.id !== 905 && `/pokemon/${info.id + 1}`}
        >
          {" "}
          Next Pokemon
        </Link>
      </div>
      <div className="info--container">
        <div className="info--upper_container">
          <div className="info--upper_left_container">
            <div className="info--name_container">
              <h1>{capitaliseStr(info.name)}</h1>
              <h1>{appendHashToId(info.id)}</h1>
            </div>
            <div className="info--img_container">
              <img
                className="info--img"
                alt="pokemon"
                src={
                  info.sprites &&
                  info.sprites.other[`official-artwork`].front_default
                }
              />
            </div>
          </div>
          <div className="info--upper_right_container">
            <p className="info--flavor_text">{pokemonFlavorText}</p>
            <table className="info--table">
              <tbody>
                <tr>
                  <th>Stat</th>
                  {info.stats.map((stat) => (
                    <td key={stat.stat.name}>
                      {capitaliseStr(stat.stat.name)}
                    </td>
                  ))}
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>Value</th>
                  {info.stats.map((stat) => (
                    <td
                      className="info--table_data_value"
                      key={`${stat.stat.name} stat`}
                    >
                      {stat.base_stat}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="info--type_container">{renderPokemonTypes}</div>
          </div>
        </div>
        <div className="info--bottom_container">
          <div className="info--ability_container">
            <h2 className="info--subtitle">Abilities</h2>
            <div className="info--abilities_container">
              {renderPokemonAbility}
            </div>
          </div>
          <div className="info--evo_container">
            <PokemonEvo />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="info--err_container">
      <h1 className="info--err">Not a pokemon name or Id</h1>
      <img className="redirect--img" src={PSYDUCK_IMG_URL} alt="Psyduck" />
      <Link className="info--err_link" to={`/`}>
        Click here to go home
      </Link>
    </div>
  );
};

export default PokemonInfo;
