import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../../service/apiService";
import Logo from "../../../assets/logo.png";
import "./Navbar.scss";
import PrimaryButton from "../../Buttons/PrimaryButton";

const Navbar = () => {
  const handleDataFetch = async () => {
    const response = await fetchData({
      path: "/Coffee",
      method: "GET",
      body: null,
    });
    console.log(response);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-container">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand ms-3 fs-3" href="#">
          <img className="logo-img" src={Logo} />
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link ms-4 fs-3" to="/">
                Home <FontAwesomeIcon icon={faHouse} />
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 fs-5"
              type="search"
              placeholder="Search city"
              aria-label="Search"
            />
            <PrimaryButton
              onClick={handleDataFetch}
              text="Search"
            ></PrimaryButton>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
