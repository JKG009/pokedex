import React from "react";
import { Link } from "react-router-dom";
import { PSYDUCK_IMG_URL } from "../config";
import "../styles/redirectPage.css"

const RedirectPage = () => {
  return (
    <div className="redirect--container">
      <h1 className="redirect--title">404, Page not found</h1>
      <img className="redirect--img"src={PSYDUCK_IMG_URL} alt="Psyduck" />
      <Link className="redirect--link" to={`/`}>Click here to go home</Link>
    </div>
  );
};

export default RedirectPage;
