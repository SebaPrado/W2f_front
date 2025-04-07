import React from "react";
import Counter from "../Counter";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { toggleOffcanvas } from "../../redux/offcanvasSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function ProductView() {
  const dispatch = useDispatch();

  const [localCounter, setLocalCounter] = useState(1);

  const [singleProduct, setSingleProduct] = useState({});
  const params = useParams();
  const tracklist = singleProduct.tracklist;

  useEffect(() => {
    const getproduct = async () => {
      const response = await axios({
        method: `GET`,
        url: `${import.meta.env.VITE_API_URL}/products/${params.id}`,
      });
      setSingleProduct(response.data);
    };
    getproduct();
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        id: singleProduct.id,
        name: singleProduct.name,
        price: singleProduct.price,
        amount: localCounter,
        image: singleProduct.image,
        artist: singleProduct.artist.name,
      })
    );
    dispatch(toggleOffcanvas());
  };

  return (
    <>
      <div className="container singleProductContainer ">
        <div className="row  Single-prod single-prod-sm ">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img
              className="image2 image2-sm "
              src={`${import.meta.env.VITE_IMG_URL}/products/${
                singleProduct.image
              }`}
              alt=""
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 Single-l Single-xl margenCol Single-prod-col-2 Single-xxl">
            <div className="sm-single-prod">
              <p className="mb-0">
                {singleProduct.artist ? singleProduct.artist.name : ""}
              </p>

              <h1>{singleProduct.name} </h1>

              <h4 className="fw-bold"> USD {singleProduct.price} </h4>
              <p>Shipping calculated at checkout</p>
              <hr />

              <div className="mb-4">
                <Counter
                  localCounter={localCounter}
                  setLocalCounter={setLocalCounter}
                />
              </div>
            </div>
            <button
              className=" btn-add-cart w-100 Cart-btn mb-4"
              onClick={handleAddToCart}
            >
              Add to Cart
              <FontAwesomeIcon
                icon={faCartShopping}
                color="white"
                size="lg"
                className="mr-2 cart-btn-icon" // Añade clases de Bootstrap para el espaciado, si es necesario
              />
            </button>

            <div className="track-list-container track-list-container-sm  ">
              <h6 className="fw-bold   ">Track List:</h6>
              <ol className="track-list mt-3">
                {tracklist &&
                  tracklist.map((item, index) => (
                    <li className="track-list" key={index}>
                      {item}
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductView;
