import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { fetchData } from "../../../service/apiService";
import { LoginResponse } from "../../../service/apiInterfaces";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../FormComponents/InputComponent";
import SecondaryButton from "../../Buttons/Secondary/SecondaryButton";
import { SnackbarContext } from "../../../context/SnackbarContext";
import Loading from "../../Pages/Loading/Loading";
import { SnackbarContextValue } from "../../../context/SnackbarContext";
import SnackBar from "../../Snackbar/Snackbar";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import googleLogo from "../../../assets/icons/google-icon.svg";
import "./Login.scss";
import ButtonWithLogo from "../../Buttons/ButtonWithLogo/ButtonWithLogo";

const sampleInfo = {
  loginPassword: "",
  loginEmail: "",
};

const Login = () => {
  const [userInfo, setUserInfo] = useState(sampleInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setSnackbar } = useContext(SnackbarContext);
  const [localSnackbar, setLocalSnackbar] = useState<
    SnackbarContextValue["snackbar"]
  >({
    open: false,
    message: "",
    type: undefined,
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = (await fetchData({
        path: "/Auth/Login",
        method: "POST",
        body: {
          password: userInfo.loginPassword,
          email: userInfo.loginEmail,
        },
      })) as LoginResponse;

      if (response.ok) {
        localStorage.setItem("accessToken", response.data.token);
        setSnackbar({
          open: true,
          message: response.message,
          type: "success",
        });

        navigate("/");
        return;
      } else {
        setSnackbar({
          open: true,
          message: response.message,
          type: "error",
        });
        if (response.status === 403) {
          navigate("/activateAccount");
        }
      }
    } catch (error) {
      setLocalSnackbar({
        open: true,
        message: "Server not responding.",
        type: "error",
      });
    }
    setUserInfo(sampleInfo);
    setLoading(false);
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

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const handleGetUserInfo = async (token: TokenResponse) => {
        try {
          const response = (await fetchData({
            path: "/Auth/AuthWithGoogle",
            method: "POST",
            body: { token: token.access_token },
          })) as LoginResponse;
          console.log(response);

          if (response.ok) {
            localStorage.setItem("accessToken", response.data.token);
            setSnackbar({
              open: true,
              message: response.message,
              type: "success",
            });

            navigate("/");
            return;
          } else {
            setSnackbar({
              open: true,
              message: response.message,
              type: "error",
            });
          }
        } catch (error) {
          console.log("Internal server error.");
        }
      };
      handleGetUserInfo(tokenResponse);
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <SnackBar
        {...localSnackbar}
        setOpen={() => setLocalSnackbar({ ...localSnackbar, open: false })}
      />

      <h1>Login With Email</h1>
      <form onSubmit={handleLogin}>
        <InputComponent
          name="loginEmail"
          value={userInfo.loginEmail}
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <InputComponent
          name="loginPassword"
          value={userInfo.loginPassword}
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="text-end">
          <SecondaryButton
            text="Forgot password?"
            className="fs-5 mt-1 bg-none"
            type="submit"
            onClick={handleResetPassword}
          />
        </div>
        <div className="text-center">
          <SecondaryButton text="Login" className="fs-2 mt-1" type="submit" />
        </div>
      </form>
      <hr />
      <div className="text-center my-5">
        <ButtonWithLogo
          text="Sign In With Google"
          onClick={googleLogin}
          className="fs-3"
          type="button"
          googleLogo={googleLogo}
        />
      </div>
    </div>
  );
};

export default Login;
