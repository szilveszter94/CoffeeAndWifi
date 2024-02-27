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
        <CafeIconComponent hasProperty={cafe.hasWifi} icon={faWifiStrong} />
        <CafeIconComponent hasProperty={cafe.canTakeCalls} icon={faPhone} />
        <CafeIconComponent
          hasProperty={cafe.canPayWith_card}
          icon={faCreditCard}
        />
        <CafeIconComponent hasProperty={cafe.hasToilet} icon={faToilet} />
        <CafeIconComponent hasProperty={cafe.hasSockets} icon={faPlug} />
      </div>
    </>
  );
};

export default CafeDetailsComponent;
