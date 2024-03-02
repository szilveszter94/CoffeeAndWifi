/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../../service/apiService";
import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "../../Section/Navbar/Navbar";
import Footer from "../../Section/Footer/Footer";
import SnackBar from "../../Snackbar/Snackbar";
import {
  SnackbarContextValue,
  SnackbarContext,
} from "../../../context/SnackbarContext";
import { useContext } from "react";
import InputComponent from "../../FormComponents/InputComponent";
import SecondaryButton from "../../Buttons/Secondary/SecondaryButton";
import Loading from "../../Pages/Loading/Loading";

const samplePasswordData = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordData, setPasswordData] = useState(samplePasswordData);
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
    setLoading(true);
    if (passwordData.password !== passwordData.confirmPassword) {
      setLocalSnackbar({
        open: true,
        message: "Passwords do not match.",
        type: "error",
      });
    }
    try {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");
      const response = await fetchData({
        path: "/Auth/ResetPassword",
        method: "POST",
        body: {
          token: token,
          userId: userId,
          newPassword: passwordData.password,
        },
      });
      if (response.ok) {
        setSnackbar({
          open: true,
          message: response.message,
          type: "success",
        });
        navigate("/loginRegister");
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
    setPasswordData(samplePasswordData);
  };

  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setPasswordData({ ...passwordData, [name]: value });
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
              <h1>Reset password.</h1>
              <form onSubmit={handlePasswordReset}>
                <InputComponent
                  name="password"
                  value={passwordData.password}
                  type="password"
                  placeholder="New password"
                  onChange={handleSetPassword}
                />
                <InputComponent
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  type="password"
                  placeholder="Confirm new password"
                  onChange={handleSetPassword}
                />
                <SecondaryButton
                  text="Change password"
                  className="fs-3 mt-3"
                  type="submit"
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

export default ResetPassword;
