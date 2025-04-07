import React from "react";
import { Outlet } from "react-router-dom";
import ShopNavbar from "../ShopNavbar";
import Footer from "../Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname === "/about") {
      document.getElementById("root").classList.add("snap-container");
      document.getElementById("root").classList.remove("snap-height");
    } else {
      document.getElementById("root").classList.remove("snap-container");
      document.getElementById("root").classList.add("snap-height");
    }
  }, [location.pathname]);

  return (
    <>
      <ShopNavbar />
      <div id="outlet-container">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default MainLayout;
