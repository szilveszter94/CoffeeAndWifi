import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";
import Cafes from "./components/Pages/Cafes/CafeList/Cafes";
import SingleCafe from "./components/Pages/Cafes/SingleCafe/SingleCafe";
import CafeEditor from "./components/Pages/Editor/CafeEditor";
import ForgotPassword from "./components/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword/ResetPassword";
import ActivateAccount from "./components/Authentication/ActivateAccount/ActivateAccount";
import LoginRegister from "./components/Authentication/LoginRegister/LoginRegister";

import "./App.scss";
import ConfirmEmail from "./components/Authentication/ConfirmEmail/ConfirmEmail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/cafe/:id" element={<SingleCafe />} />
        <Route path="/create" element={<CafeEditor />} />
        <Route path="/editor/:id" element={<CafeEditor />} />
        <Route path="/loginRegister" element={<LoginRegister />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/activateAccount" element={<ActivateAccount />} />
        <Route path="/confirmEmail" element={<ConfirmEmail />} />
      </Routes>
    </>
  );
}

export default App;
