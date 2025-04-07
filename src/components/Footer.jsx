import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { notify } from "../notify";

function Footer() {
  const handleToast = () => {
    notify("This feature is not within the scope of the project.");
  };

  return (
    <footer className="bg-dark p-3 snap-section ">
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center p-2">
          <div className="col-6 col-lg-3 d-flex flex-column align-items-center justify-content-center">
            <img
              src="/img/equal-vision-logo-navbar.webp"
              alt=""
              className="footer-logo"
            />
          </div>

          <div className="d-none d-lg-flex col-lg-2 justify-content-center">
            <FaCcVisa size="2rem" className="text-white me-2" />
            <FaCcMastercard size="2rem" className="text-white me-2" />
            <FaCcPaypal size="2rem" className="text-white" />
          </div>

          <div className="d-none d-lg-flex col-lg-4 justify-content-center">
            <div className="">
              <Link
                to="/about"
                className="text-white fw-bold text-decoration-none me-4"
              >
                CONTACT
              </Link>

              <Link
                to="/products"
                className="text-white fw-bold text-decoration-none me-4"
              >
                SHOP
              </Link>
              <Link
                to=""
                className="text-white fw-bold text-decoration-none footer-icons-left"
              >
                DASHBOARD
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-3 d-flex justify-content-center align-items-center">
            <Link to="">
              <FaInstagram
                size="1.5rem"
                className="text-white m-2 "
                onClick={handleToast}
              />
            </Link>
            <Link to="">
              <FaFacebook
                size="1.5rem"
                className="text-white m-2 "
                onClick={handleToast}
              />
            </Link>
            <Link to="">
              <FaYoutube
                size="1.5rem"
                className="text-white m-2"
                onClick={handleToast}
              />
            </Link>
            <Link to="">
              <FaXTwitter
                size="1.5rem"
                className="text-white m-2"
                onClick={handleToast}
              />
            </Link>
          </div>
        </div>
        <div className="text-white text-center mb-2">
          © 2024 Equal Vision Records
        </div>
      </div>
    </footer>
  );
}

export default Footer;
