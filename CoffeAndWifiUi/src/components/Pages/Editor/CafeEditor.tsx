import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import Navbar from "../../Section/Navbar/Navbar";
import Footer from "../../Section/Footer/Footer";
import {
  faWifiStrong,
  faPhone,
  faToilet,
  faPlug,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import "./CafeEditor.scss";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import { generateRatings, generateSeats } from "../../../utils/generateOptions";
import InputComponent from "../../FormComponents/InputComponent";
import SelectOptionComponent from "../../FormComponents/SelectOptionComponent";
import CheckboxComponent from "../../FormComponents/CheckboxComponent";
import { fetchData } from "../../../service/apiService";
import { CafeProps, SingleCafeResponse } from "../../../service/apiInterfaces";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { SnackbarContextValue } from "../../../context/SnackbarContext";
import SnackBar from "../../Snackbar/Snackbar";
import { SnackbarContext } from "../../../context/SnackbarContext";

const sampleCafe: CafeProps = {
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
  rating: "",
  seats: "",
  canPayWithCard: false,
  canTakeCalls: false,
  hasSockets: false,
  hasToilet: false,
  hasWifi: false,
  comments: [],
};

const CafeEditor = () => {
  const [cafe, setCafe] = useState(sampleCafe);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setSnackbar } = useContext(SnackbarContext);
  const [localSnackbar, setLocalSnackbar] = useState<
    SnackbarContextValue["snackbar"]
  >({
    open: false,
    message: "",
    type: undefined,
  });

  useEffect(() => {
    const loadEditObject = async () => {
      try {
        setLoading(true);
        const response = await fetchData({
          path: `/Cafe/${id}`,
          method: "GET",
          body: null,
        });
        if (response.ok) {
          const cafeResponse = response as SingleCafeResponse;
          if (!cafeResponse.data.comments) {
            cafeResponse.data.comments = [];
          }
          setCafe(cafeResponse.data);
        } else {
          setLocalSnackbar({
            open: true,
            message: response.message,
            type: "error",
          });
        }
      } catch (error) {
        setLocalSnackbar({
          open: true,
          message: "Server not responding.",
          type: "error",
        });
      }
      setLoading(false);
    };
    if (id) {
      loadEditObject();
    } else {
      setCafe(sampleCafe);
    }
  }, [id]);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = id ? "PATCH" : "POST";
    try {
      setLoading(true);
      const response = await fetchData({
        path: "/Cafe",
        method: method,
        body: cafe,
      });
      if (response.ok) {
        setSnackbar({
          open: true,
          message: response.message,
          type: "success",
        });
        if (id) {
          navigate(`/cafe/${id}`);
        } else {
          navigate("/cafes");
        }

        return;
      } else {
        setLocalSnackbar({
          open: true,
          message: response.message,
          type: "error",
        });
      }
    } catch (error) {
      setLocalSnackbar({
        open: true,
        message: "Server not responding.",
        type: "error",
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="editor-container vh-100">
      <SnackBar
        {...localSnackbar}
        setOpen={() => setLocalSnackbar({ ...localSnackbar, open: false })}
      />
      <Navbar />
      <div className="editor-content">
        <div className="mt-3 text-center">
          <h1 className="fs-1">{id ? "Edit cafe" : "Create new cafe"}</h1>
        </div>
        <form onSubmit={handleSubmit}>
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
              {!id && (
                <div className="col-md-1 mb-3">
                  <SelectOptionComponent
                    name="rating"
                    value={cafe.rating}
                    options={generateRatings()}
                    onChange={handleSetChange}
                  />
                </div>
              )}
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

export default CafeEditor;
