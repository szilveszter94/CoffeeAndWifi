import { CafeProps } from "../../../../service/apiInterfaces";
import StarComponent from "../StarComponent/StarComponent";
import {
  faWifiStrong,
  faPhone,
  faToilet,
  faPlug,
  faCity,
  faCreditCard,
  faAddressCard,
  faDollar,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CafeIconComponent from "../CafeIconComponent/CafeIconComponent";

const CafeDetailsComponent = ({ cafe }: { cafe: CafeProps }) => {
  return (
    <>
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
              <FontAwesomeIcon className="fs-3 me-2" icon={faAddressCard} />
              {cafe.address}
            </h4>
          </div>
          <div className="col-md-3">
            <h4>
              <FontAwesomeIcon className="fs-3 me-2" icon={faDollar} />
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
          text={cafe.hasWifi ? "Have wifi connection" : "No wifi connection"}
        />
        <CafeIconComponent
          hasProperty={cafe.canTakeCalls}
          icon={faPhone}
          text={cafe.canTakeCalls ? "Can take calls" : "Cannot take calls"}
        />
        <CafeIconComponent
          hasProperty={cafe.canPayWithCard}
          icon={faCreditCard}
          text={
            cafe.canPayWithCard
              ? "Can pay with credit card"
              : "Cannot pay with card"
          }
        />
        <CafeIconComponent
          hasProperty={cafe.hasToilet}
          icon={faToilet}
          text={cafe.hasToilet ? "Have toilet" : "No toilet"}
        />
        <CafeIconComponent
          hasProperty={cafe.hasSockets}
          icon={faPlug}
          text={cafe.hasSockets ? "Can charge devices" : "No plug for charging"}
        />
      </div>
    </>
  );
};

export default CafeDetailsComponent;
