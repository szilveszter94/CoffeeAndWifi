/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { fetchData } from "../../../service/apiService";
import Loading from "../Loading/Loading";
import { CafeResponse, CafeProps } from "../../../service/apiService";
import {
  faWifiStrong,
  faPhone,
  faToilet,
  faPlug,
  faCity,
  faCreditCard,
  faAddressCard,
  faDollar,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CafeIconComponent from "./CafeIconComponent/CafeIconComponent";
import Navbar from "../../Section/Navbar/Navbar";
import Footer from "../../Section/Footer/Footer";
import SecondaryButton from "../../Buttons/Secondary/SecondaryButton";
import "./Cafes.scss";
import StarComponent from "./StarComponent/StarComponent";

const Cafes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cafes, setCafes] = useState<CafeProps[] | undefined>(undefined);

  useEffect(() => {
    const fetchCafes = async () => {
      setLoading(true);
      const response = await fetchData({
        path: "/Cafe",
        method: "GET",
        body: null,
      });
      if (response.ok) {
        const cafeResponse = response as CafeResponse;
        setCafes(cafeResponse.data);
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
    <div className="cafes-container vh-100">
      <Navbar />
      <div className="cafes-content">
        <div className="container">
          {cafes &&
            cafes.map((cafe) => (
              <div
                className="cafe-item-container rounded py-3 text-center my-5"
                key={cafe.id}
              >
                <StarComponent rating={cafe.rating} name={cafe.name} />
                <h4>{cafe.description}</h4>
                <hr />
                <div className="container">
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-3">
                      <h4>
                        <FontAwesomeIcon className="fs-3 me-2" icon={faGlobe} />
                        {cafe.country}
                      </h4>
                    </div>
                    <div className="col-md-3">
                      <h4>
                        <FontAwesomeIcon className="fs-3 me-2" icon={faCity} />
                        {cafe.city}
                      </h4>
                    </div>
                    <div className="col-md-3">
                      <h4>
                        <FontAwesomeIcon
                          className="fs-3 me-2"
                          icon={faAddressCard}
                        />
                        {cafe.address}
                      </h4>
                    </div>
                    <div className="col-md-3">
                      <h4>
                        <FontAwesomeIcon
                          className="fs-3 me-2"
                          icon={faDollar}
                        />
                        Coffee price: {cafe.coffeePrice}$
                      </h4>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-center">
                  <CafeIconComponent
                    hasProperty={cafe.hasWifi}
                    icon={faWifiStrong}
                  />
                  <CafeIconComponent
                    hasProperty={cafe.canTakeCalls}
                    icon={faPhone}
                  />
                  <CafeIconComponent
                    hasProperty={cafe.canPayWith_card}
                    icon={faCreditCard}
                  />
                  <CafeIconComponent
                    hasProperty={cafe.hasToilet}
                    icon={faToilet}
                  />
                  <CafeIconComponent
                    hasProperty={cafe.hasSockets}
                    icon={faPlug}
                  />
                </div>
                <SecondaryButton
                  className="mt-5"
                  type="button"
                  text="Details"
                />
              </div>
            ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Cafes;
