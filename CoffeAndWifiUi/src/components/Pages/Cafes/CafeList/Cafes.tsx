/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../../../service/apiService";
import Loading from "../../Loading/Loading";
import { CafeProps, CafeListResponse } from "../../../../service/apiInterfaces";
import Navbar from "../../../Section/Navbar/Navbar";
import Footer from "../../../Section/Footer/Footer";
import SecondaryButton from "../../../Buttons/Secondary/SecondaryButton";
import "./Cafes.scss";
import CafeDetailsComponent from "../CafeDetailsComponent/CafeDetailsComponent";
import ButtonWithIcon from "../../../Buttons/ButtonWithIcon/ButtonWithIcon";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Cafes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cafes, setCafes] = useState<CafeProps[] | undefined>(undefined);
  const navigate = useNavigate();

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
          const cafeResponse = response as CafeListResponse;
          setCafes(cafeResponse.data);
        } else {
          alert(response.message);
        }
      } catch (error) {
        alert("Server not responding.");
      }
      setLoading(false);
    };
    fetchCafes();
  }, []);

  const handleShowDetails = (id: number) => {
    navigate(`/cafe/${id}`);
  };

  const handleDelete = async (id: number) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (!shouldDelete){
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
        const updatedCafes = cafes?.filter(cafe => cafe.id !== id);
        setCafes(updatedCafes);
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert("Server not responding.");
    }
    setLoading(false);
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
