import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PokemonList from "./components/PokemonList";
import PokemonData from "./components/PokemonData";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pokemon">
          <Route index element={<PokemonList />}></Route>
          <Route path=":id" element={<PokemonData />}></Route>
          <Route path="?page=:id"></Route>
        </Route>
        <Route path="*" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
