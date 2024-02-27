import { ChangeEvent, useState } from "react";
import Navbar from "../../Section/Navbar/Navbar";
import Footer from "../../Section/Footer/Footer";
import {
  faWifiStrong,
  faPhone,
  faToilet,
  faPlug,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Editor.scss";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import { generateRatings, generateSeats } from "../../../utils/generateOptions";

const sampleCafe = {
  id: 0,
  name: "",
  country: "",
  city: "",
  address: "",
  coffeePrice: "",
  description: "",
  imgUrl: "",
  latitude: "",
  longitude: "",
  mapUrl: "",
  rating: 0,
  seats: "",
  canPayWithCard: false,
  canTakeCalls: false,
  hasSockets: false,
  hasToilet: false,
  hasWifi: false,
  comments: [],
};

const Editor = () => {
  const [cafe, setCafe] = useState(sampleCafe);

  const handleSetChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const type = e.target.type;
    const name = e.target.name;
    if (type === "checkbox") {
      const event = e as ChangeEvent<HTMLInputElement>
      const value = event.target.checked;
      setCafe({ ...cafe, [name]: value });
    } else {
      const value = e.target.value;
      setCafe({ ...cafe, [name]: value });
    }
  };

  return (
    <div className="editor-container vh-100">
      <Navbar />
      <div className="editor-content">
        <div className="mt-3 text-center">
          <h1 className="fs-1">Create new cafe</h1>
        </div>
        <form>
          <div className="container editor-form-container mb-5">
            <div className="row mt-5">
              <div className="col-md-2 mb-3">
                <label htmlFor="name" className="form-label fs-4">
                  Cafe Name:
                </label>
                <input
                  onChange={handleSetChange}
                  id="name"
                  value={cafe.name}
                  name="name"
                  placeholder="Cafe name"
                  className="form-control custom-input fs-4"
                />
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="country" className="form-label  fs-4">
                  Country:
                </label>
                <input
                  onChange={handleSetChange}
                  id="country"
                  value={cafe.country}
                  name="country"
                  placeholder="Country"
                  className="form-control custom-input fs-4"
                />
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="city" className="form-label  fs-4">
                  City:
                </label>
                <input
                  onChange={handleSetChange}
                  id="city"
                  name="city"
                  value={cafe.city}
                  placeholder="City"
                  className="form-control custom-input fs-4"
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="address" className="form-label  fs-4">
                  Address:
                </label>
                <input
                  onChange={handleSetChange}
                  id="address"
                  name="address"
                  value={cafe.address}
                  placeholder="Address"
                  className="form-control custom-input fs-4"
                />
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="coffeePrice" className="form-label  fs-4">
                  Price: ($)
                </label>
                <input
                  onChange={handleSetChange}
                  id="coffeePrice"
                  name="coffeePrice"
                  value={cafe.coffeePrice}
                  placeholder="Coffee price"
                  className="form-control custom-input fs-4"
                />
              </div>
              <div className="col-md-1 mb-3">
                <label htmlFor="rating" className="form-label fs-4">
                  Rating:
                </label>
                <select name="rating" id="rating" value={cafe.rating} onChange={handleSetChange} className="form-select custom-input fs-4">
                  {generateRatings()}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-1 mb-3">
                <label htmlFor="seats" className="form-label  fs-4">
                  Seats:
                </label>
                <select name="seats" id="seats" value={cafe.seats} onChange={handleSetChange} className="form-select custom-input fs-4">
                  {generateSeats()}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="imgUrl" className="form-label  fs-4">
                  Image url:
                </label>
                <input
                  onChange={handleSetChange}
                  id="imgUrl"
                  name="imgUrl"
                  value={cafe.imgUrl}
                  placeholder="Image url"
                  className="form-control custom-input fs-4"
                />
              </div>
              <div className="col-md-5 mb-3">
                <label htmlFor="mapUrl" className="form-label  fs-4">
                  Google maps url:
                </label>
                <input
                  onChange={handleSetChange}
                  id="mapUrl"
                  name="mapUrl"
                  value={cafe.mapUrl}
                  placeholder="Google maps url"
                  className="form-control custom-input fs-4"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="description" className="form-label  fs-4">
                  Description:
                </label>
                <input
                  onChange={handleSetChange}
                  id="description"
                  name="description"
                  value={cafe.description}
                  placeholder="Description"
                  className="form-control custom-input fs-4"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 col-6 mb-3">
                <label htmlFor="canPayWithCard" className="form-label fs-3">
                  <FontAwesomeIcon className="fs-3 me-2" icon={faCreditCard} />
                </label>
                <input
                  onChange={handleSetChange}
                  id="canPayWithCard"
                  type="checkbox"
                  name="canPayWithCard"
                  checked={cafe.canPayWithCard}
                  className="form-check-input custom-input fs-3"
                />
              </div>
              <div className="col-md-2 col-6 mb-3">
                <label htmlFor="canTakeCalls" className="form-label  fs-3">
                  <FontAwesomeIcon className="fs-3 me-2" icon={faPhone} />
                </label>
                <input
                  onChange={handleSetChange}
                  id="canTakeCalls"
                  type="checkbox"
                  name="canTakeCalls"
                  checked={cafe.canTakeCalls}
                  className="form-check-input custom-input fs-3"
                />
              </div>
              <div className="col-md-2 col-6 mb-3">
                <label htmlFor="hasSockets" className="form-label  fs-3">
                  <FontAwesomeIcon className="fs-3 me-2" icon={faPlug} />
                </label>
                <input
                  onChange={handleSetChange}
                  id="hasSockets"
                  type="checkbox"
                  name="hasSockets"
                  checked={cafe.hasSockets}
                  className="form-check-input custom-input fs-3"
                />
              </div>
              <div className="col-md-2 col-6 mb-3">
                <label htmlFor="hasToilet" className="form-label  fs-3">
                  <FontAwesomeIcon className="fs-3 me-2" icon={faToilet} />
                </label>
                <input
                  onChange={handleSetChange}
                  id="hasToilet"
                  type="checkbox"
                  name="hasToilet"
                  checked={cafe.hasToilet}
                  className="form-check-input custom-input fs-3"
                />
              </div>
              <div className="col-md-2 col-6 mb-3">
                <label htmlFor="hasWifi" className="form-label  fs-3">
                  <FontAwesomeIcon className="fs-3 me-2" icon={faWifiStrong} />
                </label>
                <input
                  onChange={handleSetChange}
                  id="hasWifi"
                  type="checkbox"
                  name="hasWifi"
                  checked={cafe.hasWifi}
                  className="form-check-input custom-input fs-3"
                />
              </div>
            </div>
          </div>
          <div className="text-center mb-5 mt-4">
            <PrimaryButton className="fs-2" text="Submit" type="button" />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Editor;
