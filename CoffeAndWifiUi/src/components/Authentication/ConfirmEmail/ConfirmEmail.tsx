/* eslint-disable react-hooks/exhaustive-deps */
import { fetchData } from "../../../service/apiService";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SnackbarContextValue } from "../../../context/SnackbarContext";
import Loading from "../../Pages/Loading/Loading";
import Navbar from "../../Section/Navbar/Navbar";
import SnackBar from "../../Snackbar/Snackbar";
import Footer from "../../Section/Footer/Footer";
import { useEffectOnce } from "../../../utils/useEffectOnce";
import SecondaryButton from "../../Buttons/Secondary/SecondaryButton";

const ConfirmEmail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [localSnackbar, setLocalSnackbar] = useState<
    SnackbarContextValue["snackbar"]
  >({
    open: false,
    message: "",
    type: undefined,
  });

  useEffectOnce(() => {
    confirmEmail();
  });

  const confirmEmail = async () => {
    setLoading(true);
    try {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");
      const response = await fetchData({
        path: "/Auth/ConfirmEmail",
        method: "POST",
        body: {
          token: token,
          userId: userId,
        },
      });
      console.log(response);

      if (response.ok) {
        setLocalSnackbar({
          open: true,
          message: response.message,
          type: "success",
        });
        setConfirmed(true);
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
    setLoading(false);
  };

  const handleBackToLogin = () => {
    navigate("/loginRegister");
  };

  const handleBackToActivation = () => {
    navigate("/activateAccount");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="activate-account-container vh-100">
      <Navbar />
      <div className="activate-account-content">
        <SnackBar
          {...localSnackbar}
          setOpen={() => setLocalSnackbar({ ...localSnackbar, open: false })}
        />
        <div className="container">
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-md-5 text-center">
              {confirmed ? (
                <div>
                  <h1>Account activated successfully</h1>
                  <SecondaryButton
                    type="button"
                    text="Back to login"
                    className="fs-3"
                    onClick={handleBackToLogin}
                  />
                </div>
              ) : (
                <div>
                  <h1>Activation failed. Try again</h1>
                  <SecondaryButton
                    type="button"
                    className="fs-3"
                    text="Back to account activation"
                    onClick={handleBackToActivation}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmEmail;
