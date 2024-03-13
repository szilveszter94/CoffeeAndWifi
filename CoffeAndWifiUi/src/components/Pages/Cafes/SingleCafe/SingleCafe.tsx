/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import {
  CafeProps,
  CommentWithUserProps,
  SingleCafeResponse,
} from "../../../../service/apiInterfaces";
import { fetchData } from "../../../../service/apiService";
import CafeDetailsComponent from "../CafeDetailsComponent/CafeDetailsComponent";
import MoreCafeDetailsComponent from "../CafeDetailsComponent/MoreCafeDetailsComponent";
import Navbar from "../../../Section/Navbar/Navbar";
import Footer from "../../../Section/Footer/Footer";
import "./SingleCafe.scss";
import ButtonWithIcon from "../../../Buttons/ButtonWithIcon/ButtonWithIcon";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { SnackbarContext } from "../../../../context/SnackbarContext";
import SnackBar from "../../../Snackbar/Snackbar";

const SingleCafe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cafe, setCafe] = useState<CafeProps | undefined>(undefined);
  const [comments, setComments] = useState<CommentWithUserProps[] | undefined>(undefined);
  const { snackbar, setSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setSnackbar({
        open: false,
        message: "",
        type: undefined,
      });
    }, 6000);
  }, [setSnackbar]);

  useEffect(() => {
    const fetchCafes = async () => {
      setLoading(true);
      const response = await fetchData({
        path: `/Cafe/${id}`,
        method: "GET",
        body: null,
      });
      if (response.ok) {
        const cafeResponse = response as SingleCafeResponse;
        setComments(cafeResponse.data.comments);
        setCafe(cafeResponse.data.cafe);
      } else {
        setSnackbar({
          open: true,
          message: response.message,
          type: "error",
        });
      }
      setLoading(false);
    };
    fetchCafes();
  }, []);

  const handleEdit = () => {
    navigate(`/editor/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="single-cafe-container vh-100">
      <SnackBar
        {...snackbar}
        setOpen={() => setSnackbar({ ...snackbar, open: false })}
      />
      <Navbar />
      <div className="single-cafe-content">
        <div className="container">
          <div className="cafe-item-container rounded py-3 text-center my-5">
            <div className="text-end m-3">
              <ButtonWithIcon
                type="button"
                text="Edit"
                icon={faEdit}
                onClick={() => handleEdit()}
                buttonClass="fs-3 mx-2"
                iconClass="fs-3"
              />
            </div>
            {cafe && <CafeDetailsComponent cafe={cafe} />}
            {cafe && <MoreCafeDetailsComponent cafe={cafe} comments={comments} setCafe={setCafe} />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleCafe;
