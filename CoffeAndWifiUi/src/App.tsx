import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";
import Cafes from "./components/Pages/Cafes/Cafes";

import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cafes" element={<Cafes />} />
      </Routes>
    </>
  );
}

export default App;
