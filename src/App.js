import React from 'react';
import { PokemonInfo, PokemonList, RedirectPage } from "./components"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>    
      <Routes>
        <Route path="/" exact element={<PokemonList />} />
        <Route path="/pokemon/:pokemonId" exact element={<PokemonInfo />} />
        <Route path="*" exact element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
