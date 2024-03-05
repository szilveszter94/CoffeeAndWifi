/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../../../service/apiService";
import Loading from "../../Loading/Loading";
import { CafeProps, BaseResponse } from "../../../../service/apiInterfaces";
import Navbar from "../../../Section/Navbar/Navbar";
import Footer from "../../../Section/Footer/Footer";
import SecondaryButton from "../../../Buttons/Secondary/SecondaryButton";
import "./Cafes.scss";
import CafeDetailsComponent from "../CafeDetailsComponent/CafeDetailsComponent";
import ButtonWithIcon from "../../../Buttons/ButtonWithIcon/ButtonWithIcon";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SnackBar from "../../../Snackbar/Snackbar";
import { SnackbarContextValue } from "../../../../context/SnackbarContext";
import { SnackbarContext } from "../../../../context/SnackbarContext";

const Cafes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cafes, setCafes] = useState<CafeProps[] | undefined>(undefined);
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
    const fetchCafes = async () => {
      setLoading(true);
      try {
        const response = await fetchData({
          path: "/Cafe",
          method: "GET",
          body: null,
        });
        if (response.ok) {
          const cafeResponse = response as BaseResponse;
          setCafes(cafeResponse.data);
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
    fetchCafes();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSnackbar({
        open: false,
        message: "",
        type: undefined,
      });
    }, 6000);
  }, [setSnackbar]);

  const handleShowDetails = (id: number) => {
    navigate(`/cafe/${id}`);
  };

  const handleDelete = async (id: number) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (!shouldDelete) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetchData({
        path: `/Cafe/${id}`,
        method: "DELETE",
        body: null,
      });
      if (response.ok) {
        const updatedCafes = cafes?.filter((cafe) => cafe.id !== id);
        setCafes(updatedCafes);
        setLocalSnackbar({
          open: true,
          message: "Cafe deleted successfully",
          type: "success",
        });
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="cafes-container vh-100">
      <SnackBar
        {...localSnackbar}
        setOpen={() => setLocalSnackbar({ ...localSnackbar, open: false })}
      />
      <SnackBar
        {...snackbar}
        setOpen={() => setSnackbar({ ...snackbar, open: false })}
      />
      <Navbar />
      <div className="cafes-content">
        <div className="container">
          {cafes ? (
            cafes.map((cafe) => (
              <div
                className="cafe-item-container rounded py-3 text-center my-5"
                key={cafe.id}
              >
                <CafeDetailsComponent cafe={cafe} />
                <SecondaryButton
                  className="mt-5 fs-3 mx-2"
                  type="button"
                  text="Details"
                  onClick={() => handleShowDetails(cafe.id)}
                />
                <ButtonWithIcon
                  buttonClass="fs-3 mx-2 delete"
                  iconClass="fs-3 me-2"
                  type="button"
                  icon={faTrashCan}
                  text="Delete"
                  onClick={() => handleDelete(cafe.id)}
                />
              </div>
            ))
          ) : (
            <div className="text-center">
              <h2 className="my-5">
                Cafes not found. The server not responding.
              </h2>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Cafes;
