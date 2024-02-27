import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";
import Cafes from "./components/Pages/Cafes/CafeList/Cafes";

import "./App.scss";
import SingleCafe from "./components/Pages/Cafes/SingleCafe/SingleCafe";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/cafe/:id" element={<SingleCafe />} />
      </Routes>
    </>
  );
}

export default App;
