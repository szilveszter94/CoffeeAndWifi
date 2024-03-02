import { ChangeEvent, FormEvent, useState, useContext, useEffect } from "react";
import SnackBar from "../../Snackbar/Snackbar";
import { SnackbarContextValue } from "../../../context/SnackbarContext";
import InputComponent from "../../FormComponents/InputComponent";
import SecondaryButton from "../../Buttons/Secondary/SecondaryButton";
import Loading from "../../Pages/Loading/Loading";
import { fetchData } from "../../../service/apiService";
import { SnackbarContext } from "../../../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import Footer from "../../Section/Footer/Footer";
import Navbar from "../../Section/Navbar/Navbar";
import "./ActivateAccount.scss";

const ActivateAccount = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { snackbar, setSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [localSnackbar, setLocalSnackbar] = useState<
    SnackbarContextValue["snackbar"]
  >({
    open: false,
    message: "",
    type: undefined,
  });

  useEffect(() => {
    setTimeout(() => {
      setSnackbar({
        open: false,
        message: "",
        type: undefined,
      });
    }, 6000);
  }, [setSnackbar]);

  const handleActivateAccount = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetchData({
        path: "/Auth/ActivateEmail",
        method: "POST",
        body: {
          email: email,
        },
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
        message: "Server not responding.",
        type: "error",
      });
    }
    setEmail("");
    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="activate-account-container vh-100">
      <Navbar />
      <div className="activate-account-content">
        <SnackBar
          {...snackbar}
          setOpen={() => setSnackbar({ ...snackbar, open: false })}
        />
        <SnackBar
          {...localSnackbar}
          setOpen={() => setLocalSnackbar({ ...localSnackbar, open: false })}
        />
        <div className="container">
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-md-5 text-center">
              <h1>Activate your account</h1>
              <form onSubmit={handleActivateAccount}>
                <InputComponent
                  name="email"
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <div className="text-center">
                  <SecondaryButton
                    text="Send activation email"
                    className="fs-2 mt-5"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActivateAccount;
