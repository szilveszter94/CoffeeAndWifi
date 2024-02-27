/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCafeList } from "../../../../service/apiService";
import Loading from "../../Loading/Loading";
import { CafeProps, CafeListResponse } from "../../../../service/apiInterfaces";
import Navbar from "../../../Section/Navbar/Navbar";
import Footer from "../../../Section/Footer/Footer";
import SecondaryButton from "../../../Buttons/Secondary/SecondaryButton";
import "./Cafes.scss";
import CafeDetailsComponent from "../CafeDetailsComponent/CafeDetailsComponent";

const Cafes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cafes, setCafes] = useState<CafeProps[] | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchCafeList({
        path: "/Cafe",
        method: "GET",
        body: null,
      });
      if (response.ok) {
        const cafeResponse = response as CafeListResponse;
        setCafes(cafeResponse.data);
      } else {
        alert(response.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleShowDetails = (id: number) => {
    navigate(`/cafe/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="cafes-container vh-100">
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
                  className="mt-5"
                  type="button"
                  text="Details"
                  onClick={() => handleShowDetails(cafe.id)}
                />
              </div>
            ))
          ) : (
            <div className="text-center">
            <h2 className="my-5">Cafes not found. The server not responding.</h2>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Cafes;
