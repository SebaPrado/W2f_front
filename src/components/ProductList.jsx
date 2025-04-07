import React from "react";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

function ProductList() {
  const params = useParams();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        method: `GET`,
        url: `${import.meta.env.VITE_API_URL}/products`,
      });
      setProductList(response.data);
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          {params.id
            ? productList
                .filter((product) => product.categoryId === parseInt(params.id))
                .map((product) => (
                  <div
                    className="col-8 col-sm-6 col-md-4 col-lg-3"
                    key={product.id}
                  >
                    <Product product={product} />
                  </div>
                ))
            : productList.map((product) => (
                <div
                  className="col-8 col-sm-6 col-md-4 col-lg-3"
                  key={product.id}
                >
                  <Product product={product} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
