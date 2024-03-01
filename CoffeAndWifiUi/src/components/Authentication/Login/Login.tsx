import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { fetchData } from "../../../service/apiService";
import { LoginResponse } from "../../../service/apiInterfaces";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const sampleInfo = {
  password: "",
  email: "",
};

const Login = () => {
  const [userInfo, setUserInfo] = useState(sampleInfo);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchData({
        path: "/Auth/Login",
        method: "POST",
        body: userInfo,
      });
      if (response.ok) {
        const loginData = response as LoginResponse;
        localStorage.setItem("accessToken", loginData.data.token);
        console.log("Login successful.");
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = () => {
    navigate("/forgotPassword");
    return;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div>
      <h1>Login</h1>
      <h2 className="text-light">
        {" "}
        Hello {currentUser && currentUser.data.username}
      </h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <button onClick={handleResetPassword}>Reset password</button>
      </form>
    </div>
  );
};

export default Login;
