import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";
import Cafes from "./components/Pages/Cafes/CafeList/Cafes";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";

import "./App.scss";
import SingleCafe from "./components/Pages/Cafes/SingleCafe/SingleCafe";
import Editor from "./components/Pages/Editor/Editor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/cafe/:id" element={<SingleCafe />} />
        <Route path="/create" element={<Editor />} />
        <Route path="/editor/:id" element={<Editor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
