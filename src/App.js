import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonInfo, PokemonList } from "./components";
import { RedirectPage } from "./Pages";

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
