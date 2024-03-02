import Navbar from "../../Section/Navbar/Navbar";
import Footer from "../../Section/Footer/Footer";
import { importImages } from "../../../utils/imageImport";
import { useEffect, useState } from "react";
import { Images } from "../../../utils/imageImport";
import Loading from "../Loading/Loading";
import "./Home.scss";
import { SnackbarContext } from "../../../context/SnackbarContext";
import { useContext } from "react";
import SnackBar from "../../Snackbar/Snackbar";

const Home = () => {
  const [images, setImages] = useState<Images | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { snackbar, setSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const response = await importImages(4);
      setImages(response);
      setLoading(false);
    };
    loadImages();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSnackbar({
        open: false,
        message: "",
        type: undefined,
      });
    }, 6000);
  }, [setSnackbar]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home-container vh-100">
      <SnackBar
        {...snackbar}
        setOpen={() => setSnackbar({ ...snackbar, open: false })}
      />
      <Navbar />
      <div className="home-content">
        <div className="container mt-5">
          <div className="text-center">
            <h1 className="title mb-4">
              Discover Your Perfect Work Haven with{" "}
              <span className="brand-name">{" NetCafé "}</span>!
            </h1>
            <h2 className="lead-text mb-4">
              Searching for the ideal spot to unleash your productivity while
              indulging in the finest brews? Look no further.
            </h2>
            <h2 className="lead-text">
              Gone are the days of aimless wandering in search of a suitable
              workspace. With our curated collection of cafes, you can now find
              your ideal sanctuary with just a few clicks.
            </h2>
          </div>
          <div className="row d-flex justify-content-center align-items-center text-center my-5">
            {images &&
              images.map((img) => (
                <div className="col-md-3" key={img}>
                  <div>
                    <img className="img-thumbnail my-2" src={img} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
