/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import {
  CafeProps,
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

const SingleCafe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cafe, setCafe] = useState<CafeProps | undefined>(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

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
        setCafe(cafeResponse.data);
      } else {
        alert(response.message);
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
            {cafe && <MoreCafeDetailsComponent cafe={cafe} />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleCafe;
