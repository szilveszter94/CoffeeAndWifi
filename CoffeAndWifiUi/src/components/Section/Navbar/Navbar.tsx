import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faHouse } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../assets/logo.png";
import "./Navbar.scss";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import { FormEvent } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const handleDataFetch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/cafes");
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
        <Link className="navbar-brand ms-3 fs-3" to="/">
          <img className="logo-img" src={Logo} />
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link ms-4 fs-3" to="/">
                Home <FontAwesomeIcon icon={faHouse} />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link ms-4 fs-3" to="/about">
                About <FontAwesomeIcon icon={faInfoCircle} />
              </Link>
            </li>
          </ul>
          <form onSubmit={handleDataFetch} className="d-flex" role="search">
            <input
              className="form-control me-2 fs-5"
              type="search"
              placeholder="Search city"
              aria-label="Search"
            />
            <PrimaryButton
              onClick={undefined}
              type="submit"
              text="Search"
            ></PrimaryButton>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
