import Navbar from "../../Section/Navbar/Navbar";
import Footer from "../../Section/Footer/Footer";
import "./About.scss";

const About = () => {
  return (
    <div className="about-container vh-100">
      <Navbar />
      <div className="about-content">
        <div className="container mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 text-center">
              <h1 className="title mb-3">About Our Website</h1>
              <h2 className="lead-text col-mb-5">
                Welcome to our website! We're dedicated to helping you find the
                perfect cafe to work from, where you can enjoy a good Wi-Fi
                connection and a conducive environment for productivity. Our
                goal is to make it easy for you to discover cafes that not only
                offer great Wi-Fi but also provide a comfortable and inspiring
                space to get your work done.
              </h2>
              <h1 className="title mb-3">Why Choose Us?</h1>
              <h2 className="lead-text mb-5">
                At <span className="brand-name fs-4">{" NetCafé "}</span>, we
                understand the importance of finding the right environment to
                work in. That's why we've curated a list of cafes that meet your
                needs for reliable Wi-Fi and a welcoming atmosphere. Whether
                you're a freelancer, remote worker, or student, we've got you
                covered.
              </h2>
              <h2 className="lead-text">
                Take a look at some of our featured cafes below. These are just
                a few examples of the many great locations you can discover on
                our website. Each cafe offers a unique atmosphere and amenities,
                but they all share one thing in common: they're perfect for
                getting work done while enjoying your favorite coffee.
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
