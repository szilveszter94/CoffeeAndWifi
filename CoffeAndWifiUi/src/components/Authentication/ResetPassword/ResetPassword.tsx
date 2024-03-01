/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../../../service/apiService";
import { ChangeEvent, FormEvent, useState } from "react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState<string>("");

  const logCredentials = () => {
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");
    console.log(userId, token);
  };

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");
      const response = await fetchData({
        path: "/Auth/ResetPassword",
        method: "POST",
        body: { token: token, userId: userId, newPassword: password },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  return (
    <div>
      <h1>Reset password.</h1>
      <form onSubmit={handlePasswordReset}>
        <input
          name="password"
          placeholder="New password"
          onChange={handleSetPassword}
        />
        <button type="submit">Reset password</button>
      </form>
      <button onChange={logCredentials}>Credentials</button>
    </div>
  );
};

export default ResetPassword;
