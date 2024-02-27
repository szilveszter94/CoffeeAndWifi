/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import {
  CafeProps,
  SingleCafeResponse,
} from "../../../../service/apiInterfaces";
import { fetchCafeList } from "../../../../service/apiService";
import CafeDetailsComponent from "../CafeDetailsComponent/CafeDetailsComponent";
import MoreCafeDetailsComponent from "../CafeDetailsComponent/MoreCafeDetailsComponent";
import Navbar from "../../../Section/Navbar/Navbar";
import Footer from "../../../Section/Footer/Footer";
import "./SingleCafe.scss";

const SingleCafe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cafe, setCafe] = useState<CafeProps | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    const fetchCafes = async () => {
      setLoading(true);
      const response = await fetchCafeList({
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="single-cafe-container vh-100">
      <Navbar />
      <div className="single-cafe-content">
        <div className="container">
          <div className="cafe-item-container rounded py-3 text-center my-5">
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
