import React from "react";
import { Link } from "react-router-dom";

function Product({ product }, featured) {
  return (
    <>
      <div className="d-flex align-items-center flex-column">
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none text-secondary"
        >
          <img
            className={
              featured ? "product-featured-image" : "product-regular-image"
            }
            src={`${import.meta.env.VITE_IMG_URL}/products/${product.image}`}
          />
          <div className="d-flex flex-column align-items-center text-start product-info-div mx-2 mb-2 ">
            <span className="fw-lighter text-uppercase product-artist-name">
              {product.artist.name}
            </span>
            <h4 className="mt-sm-3   text-img no-underline text-uppercase fw-bold text-black text-center">
              {product.name}
            </h4>
            <p className="my-1 text-img no-underline text-black">
              USD {product.price}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Product;
