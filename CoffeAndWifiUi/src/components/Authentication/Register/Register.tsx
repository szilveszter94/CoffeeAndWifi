import { ChangeEvent, FormEvent, useState } from "react";
import { fetchData } from "../../../service/apiService";

const sampleInfo = {
  username: "",
  password: "",
  email: "",
};

const Register = () => {
  const [userInfo, setUserInfo] = useState(sampleInfo);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchData({
        path: "/Auth/Register",
        method: "POST",
        body: userInfo,
      });
      console.log(response);
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
      <form onSubmit={handleRegister}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="User name"
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

export default Register;
