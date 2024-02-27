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
import "./Editor.scss";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import { generateRatings, generateSeats } from "../../../utils/generateOptions";
import InputComponent from "../../FormComponents/InputComponent";
import SelectOptionComponent from "../../FormComponents/SelectOptionComponent";
import CheckboxComponent from "../../FormComponents/CheckboxComponent";

const sampleCafe = {
  id: undefined,
  name: "",
  country: "",
  city: "",
  address: "",
  coffeePrice: undefined,
  description: "",
  imgUrl: "",
  latitude: undefined,
  longitude: undefined,
  rating: undefined,
  seats: undefined,
  canPayWithCard: false,
  canTakeCalls: false,
  hasSockets: false,
  hasToilet: false,
  hasWifi: false,
  comments: [],
};

const Editor = () => {
  const [cafe, setCafe] = useState(sampleCafe);

  const handleSetChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const type = e.target.type;
    const name = e.target.name;
    if (type === "checkbox") {
      const event = e as ChangeEvent<HTMLInputElement>;
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
                <InputComponent
                  name="name"
                  value={cafe.name}
                  placeholder="Cafe name"
                  type="text"
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <InputComponent
                  name="country"
                  value={cafe.country}
                  placeholder="Country"
                  type="text"
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <InputComponent
                  name="city"
                  value={cafe.city}
                  placeholder="City"
                  type="text"
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <InputComponent
                  name="address"
                  value={cafe.address}
                  placeholder="Address"
                  type="text"
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <InputComponent
                  name="coffeePrice"
                  value={cafe.coffeePrice}
                  placeholder="Price ($)"
                  type="number"
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-1 mb-3">
                <SelectOptionComponent
                  name="rating"
                  value={cafe.rating}
                  options={generateRatings()}
                  onChange={handleSetChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 mb-3">
                <SelectOptionComponent
                  name="seats"
                  value={cafe.seats}
                  options={generateSeats()}
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <InputComponent
                  name="imgUrl"
                  value={cafe.imgUrl}
                  placeholder="Image url"
                  type="text"
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <InputComponent
                  name="longitude"
                  value={cafe.longitude}
                  placeholder="Longitude"
                  type="number"
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <InputComponent
                  name="latitude"
                  value={cafe.latitude}
                  placeholder="Latitude"
                  type="number"
                  onChange={handleSetChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <InputComponent
                  name="description"
                  value={cafe.description}
                  placeholder="Description"
                  type="text"
                  onChange={handleSetChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 col-6 mb-3">
                <CheckboxComponent
                  name="canPayWithCard"
                  checked={cafe.canPayWithCard}
                  icon={faCreditCard}
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-2 col-6 mb-3">
                <CheckboxComponent
                  name="canTakeCalls"
                  checked={cafe.canTakeCalls}
                  icon={faPhone}
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-2 col-6 mb-3">
                <CheckboxComponent
                  name="hasSockets"
                  checked={cafe.hasSockets}
                  icon={faPlug}
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-2 col-6 mb-3">
                <CheckboxComponent
                  name="hasToilet"
                  checked={cafe.hasToilet}
                  icon={faToilet}
                  onChange={handleSetChange}
                />
              </div>
              <div className="col-md-2 col-6 mb-3">
                <CheckboxComponent
                  name="hasWifi"
                  checked={cafe.hasWifi}
                  icon={faWifiStrong}
                  onChange={handleSetChange}
                />
              </div>
            </div>
          </div>
          <div className="text-center mb-5 mt-4">
            <PrimaryButton className="fs-2" text="Submit" type="submit" />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Editor;
