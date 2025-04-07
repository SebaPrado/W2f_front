import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { emptyCart } from "../redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaCcPaypal, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { notify } from "../notify";
import CountrySelector from "../components/views/CountrySelector";

function Cart() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [mostrarFormularioTarjeta, setMostrarFormularioTarjeta] =
    useState(false);
  const cardFormClass = mostrarFormularioTarjeta
    ? "cardFormVisible"
    : "cardFormHidden";

  const cart = useSelector((state) => state.cart);
  const userSlice = useSelector((state) => state.user);

  const subtotal = cart.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.amount,
    0
  );
  const taxes = cart.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.amount * 0.1,
    0
  );

  const handleEmptyCart = () => {
    if (!paymentMethod) {
      notify("Please select a payment method.");
    } else if (cart.length === 0) {
      notify("You have no products in your cart.");
    } else {
      const postOrder = async () => {
        const axiosConfig = {
          method: `POST`,
          url: `${import.meta.env.VITE_API_URL}/orders`,
          data: {
            products: cart,
            paymentMethod: paymentMethod,
          },
          headers: {
            Authorization: "Bearer " + userSlice.token,
          },
        };
        const response = await axios(axiosConfig);
      };
      postOrder();
      navigate("/confirmation");
    }
  };

  return (
    <>
      <div className="mt-5 fatherSectionCart row ">
        <div className="leftSectionCart col-lg-5 col-sm-12 mt-5 px-5 border pt-4 mx-1 mb-4">
          <form>
            <div className="col-sm-12">
              <h4 className="mb-3">Contact information</h4>
              <label htmlFor="password" className="form-label">
                Email address
              </label>
              <input
                type="text"
                id="email"
                className="form-control cart-form"
                defaultValue="John.Wayne@gmail.com"
                
              />
            </div>
            <hr />
            <div className="mt-4">
              <h5>Shipping information</h5>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 col-sm-12">
                <label htmlFor="lastname" className="form-label">
                  Firstname
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="form-control cart-form"
                  defaultValue="John"
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <label htmlFor="lastname" className="form-label">
                  Lastname
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="form-control cart-form"
                  defaultValue="Wayne"
                />
              </div>
            </div>
            <div className="mt-3 col-md-6 col-sm-12">
              <label htmlFor="password" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="email"
                className="form-control cart-form"
                defaultValue="1234 Main street"
              />
            </div>
            <div className="row mt-2 justify-content-between">
              <div className="col-md-6 col-sm-12 mt-3">
                <label htmlFor="lastname" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="form-control cart-form"
                  defaultValue="City"
                />
              </div>
              <div className="col-md-6 col-sm-12 mt-3">
                <label htmlFor="lastname" className="form-label">
                  Country
                </label>
               
                <CountrySelector />
              </div>
              <div className="col-md-6 col-sm-12 mt-3">
                <label htmlFor="lastname" className="form-label">
                  State / Province
                </label>
                <input
                  type="text"
                  id="state"
                  className="form-control cart-form"
                  defaultValue="State"
                />
              </div>
              <div className="col-md-6 col-sm-12 mt-3">
                <label htmlFor="lastname" className="form-label">
                  Postal code
                </label>
                <input
                  type="text"
                  id="postcode"
                  className="form-control cart-form"
                  defaultValue="1234"
                />
              </div>
            </div>
            <label htmlFor="password" className="form-label mt-3">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="form-control cart-form"
              defaultValue="1234 1234 1234 "
            />
            <hr />
            <div className="mt-4">
              <h5>Payment</h5>
            </div>
            <div className="px-3">
              <div className="form-check form-check-inline px-2 ">
                <div className="d-flex align-items-center justify-content-center my-2 ">
                  <input
                    className="form-check-input "
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="card"
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setMostrarFormularioTarjeta(true);
                    }}
                  />
                  <label
                    className="form-check-label mx-2 mt-1"
                    htmlFor="inlineRadio1"
                  >
                    Credit card
                  </label>
                  <FaCcVisa size="2rem" className=" me-2" />
                  <FaCcMastercard size="2rem" className=" me-2" />
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="form-check form-check-inline px-2">
                <div className="d-flex align-items-center justify-content-center my-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="paypal"
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setMostrarFormularioTarjeta(false);
                    }}
                  />

                  <label
                    className="form-check-label ms-2 mt-1"
                    htmlFor="inlineRadio2"
                  >
                    Paypal
                  </label>
                  <FaCcPaypal size="2rem" className=" mx-2" />
                </div>
              </div>
            </div>

            <div
              className={`cardForm ${cardFormClass} mb-4`}
              style={{
                visibility: mostrarFormularioTarjeta ? "visible" : "hidden",
              }}
            >
              <div className="mt-3 col-md-12 col-sm-12 mb-2">
                <label htmlFor="password" className="form-label">
                  Card number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="form-control cart-form"
                  defaultValue="1234 - 1234 - 1234 - 1234"
                />
              </div>
              <div className="mt-3 col-md-12 col-sm-12 mb-2">
                <label htmlFor="password" className="form-label">
                  Name on card
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  className="form-control cart-form"
                  defaultValue="John Wayne"
                />
              </div>
              <div className="row">
                <div className="mt-3 col-md-5 col-sm-12 mb-2">
                  <label htmlFor="password" className="form-label">
                    Expiration date (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expDate"
                    className="form-control cart-form"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="mt-3 col-md-5 col-sm-12 mb-2 CVC-Container">
                  <label htmlFor="password" className="form-label">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="CVC"
                    className="form-control cart-form"
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="rigthSectionCart col-lg-5 mt-5 col-sm-12 px-5 border pt-4 mx-1 mb-4">
          <h4 className="mb-3">Order summary</h4>
          <ul className="ul-list ">
            {cart.map((cartItem) => (
              <li key={cartItem.id}>
                <CartItem cartItem={cartItem} />
              </li>
            ))}
          </ul>

          <div className="px-3 pt-4 d-flex flex-column">
            <div className="d-flex justify-content-between ">
              <span className="fw-bold">Sub-total:</span>
              <span>
                <div>
                  <p className="fw-bold">USD {subtotal}.00</p>
                </div>
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>USD 0</span>
            </div>
            <div className="d-flex justify-content-between my-1">
              <span>Taxes</span>
              <span>USD {taxes}.00</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold my-3">
              <span>
                <h5 className="fw-bold">Payment Total:</h5>
              </span>
              <span>
                <h5 className="fw-bold">USD {subtotal + taxes}.00</h5>
              </span>
            </div>
            <div>
              <button
                className="btn btn-dark btn-order my-3 w-100"
                onClick={handleEmptyCart}
              >
                Confirm Order
              </button>

              <p>You're one click away from starting to listen.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

//testing
