import React from "react";
import { Link } from "react-router-dom";

const RedirectPage = () => {
  return (
    <div>
      <p>404, Page not found</p>
      <Link to={`/`}>Click here to go home</Link>
      <p>Or try typing in the url "/pokemon/" followed by any pokemon Name/Id</p>
    </div>
  );
};

export default RedirectPage;
