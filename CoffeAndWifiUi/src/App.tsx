import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";
import Cafes from "./components/Pages/Cafes/CafeList/Cafes";
import SingleCafe from "./components/Pages/Cafes/SingleCafe/SingleCafe";
import Editor from "./components/Pages/Editor/Editor";
import ForgotPassword from "./components/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword/ResetPassword";
import ActivateAccount from "./components/Authentication/ActivateAccount/ActivateAccount";
import LoginRegister from "./components/Authentication/LoginRegister/LoginRegister";

import "./App.scss";

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
        <Route path="/loginregister" element={<LoginRegister />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/activateAccount" element={<ActivateAccount />} />
      </Routes>
    </>
  );
}

export default App;
