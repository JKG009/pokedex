import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonList, PokemonInfo, RedirectPage } from "./Pages";
import "./styles/global.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:pokemonId" element={<PokemonInfo />} />
        <Route path="*" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
