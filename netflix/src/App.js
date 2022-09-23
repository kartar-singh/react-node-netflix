
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import List from './Coomponents/List';
import NoPage from "./Coomponents/NoPage";
import Layout from "./Coomponents/Layout";
import Home from "./Coomponents/Home";
import Series from "./Coomponents/Series";
import Anime from "./Coomponents/Anime";
import Description from "./Coomponents/Description";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/List" element={<List />} />
          <Route path="/Series" element={<Series />}></Route>
          <Route path="/Anime" element={<Anime />}></Route>
          <Route path="*" element={<NoPage />} />
          <Route path="/description/:id" element={<Description />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
