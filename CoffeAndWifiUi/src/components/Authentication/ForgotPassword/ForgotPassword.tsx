import { ChangeEvent, FormEvent, useState } from "react";
import { fetchData } from "../../../service/apiService";
import Footer from "../../Section/Footer/Footer";
import Navbar from "../../Section/Navbar/Navbar";
import InputComponent from "../../FormComponents/InputComponent";
import SecondaryButton from "../../Buttons/Secondary/SecondaryButton";
import SnackBar from "../../Snackbar/Snackbar";
import { SnackbarContext } from "../../../context/SnackbarContext";
import { useContext } from "react";
import Loading from "../../Pages/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { SnackbarContextValue } from "../../../context/SnackbarContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [localSnackbar, setLocalSnackbar] = useState<
    SnackbarContextValue["snackbar"]
  >({
    open: false,
    message: "",
    type: undefined,
  });

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetchData({
        path: "/Auth/ForgotPassword",
        method: "POST",
        body: { email: email },
      });
      if (response.ok) {
        setSnackbar({
          open: true,
          message: response.message,
          type: "success",
        });
        navigate("/");
        return;
      } else {
        setLocalSnackbar({
          open: true,
          message: response.message,
          type: "error",
        });
      }
    } catch (error) {
      setLocalSnackbar({
        open: true,
        message: "Server not responding",
        type: "error",
      });
    }
    setLoading(false);
    setEmail("");
  };

  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="activate-account-container vh-100">
      <Navbar />
      <SnackBar
        {...localSnackbar}
        setOpen={() => setLocalSnackbar({ ...localSnackbar, open: false })}
      />
      <div className="activate-account-content">
        <div className="container">
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-md-5 text-center">
              <h1>Forgot password.</h1>
              <form onSubmit={handlePasswordReset}>
                <InputComponent
                  type="email"
                  value={email}
                  name="email"
                  placeholder="Email"
                  onChange={handleSetEmail}
                />
                <SecondaryButton
                  className="fs-3 mt-3"
                  type="submit"
                  text="Send activation email"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
