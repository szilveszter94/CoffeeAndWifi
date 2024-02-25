import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
