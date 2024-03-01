import { ChangeEvent, FormEvent, useState } from "react";
import { fetchData } from "../../../service/apiService";

const samplePasswordResetProps = {
  email: "",
};

const ForgotPassword = () => {
  const [email, setEmail] = useState(samplePasswordResetProps);

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchData({
        path: "/Auth/ForgotPassword",
        method: "POST",
        body: email,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setEmail({ ...email, [name]: value });
  };

  return (
    <div>
      <h1>Forgot password.</h1>
      <form onSubmit={handlePasswordReset}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleSetEmail}
        />
        <button type="submit">Send password reset</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
