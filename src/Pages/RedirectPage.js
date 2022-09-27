import React from "react";
import { Link } from "react-router-dom";

const PSYDUCK_IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png";

const RedirectPage = () => {
  return (
    <div>
      <p>404, Page not found</p>
      <img src={PSYDUCK_IMG_URL} alt="Psyduck" />
      <Link to={`/`}>Click here to go home</Link>
    </div>
  );
};

export default RedirectPage;
