import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="w-50 border border-dark-subtle rounded glass-box p-4">
          <div className="d-flex mt-4 justify-content-center mb-4">
            <img
              src="/img/equal-vision-old-logo.webp"
              alt=""
              className="ev-404-logo"
            />
          </div>
          <h3 className="text-center">
            Oops... we found our long-lost logo, yet we couldn't find that page!
          </h3>
        </div>
      </div>
    </>
  );
}

export default NotFound;
