import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { fetchData } from "../../../service/apiService";
import { LoginResponse } from "../../../service/apiInterfaces";
import { UserContext } from "../../../context/UserContext";

const sampleInfo = {
  password: "",
  email: "",
};

const Login = () => {
  const [userInfo, setUserInfo] = useState(sampleInfo);
  const { setCurrentUser } = useContext(UserContext);

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
        setCurrentUser({
          email: loginData.data.email,
          username: loginData.data.username,
        });
        console.log("Login successful.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Login;
