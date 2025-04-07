import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeProduct, updateQuantity } from "../redux/cartSlice";

import { notify4 } from "../notify";

function CartItem({ cartItem }) {
  const subtotal = cartItem.amount * cartItem.price;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(cartItem.amount);

  const handleDelete = () => {
    dispatch(removeProduct(cartItem.id));
  };

  const handleIncrease = () => {
    if (quantity < 5) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: cartItem.id, amount: newQuantity }));
    } else {
      notify4("We apologize, selection is limited to 5 units per product.");
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: cartItem.id, amount: newQuantity }));
    }
  };

  return (
    <>
      <div className="singleItemInCart py-1 ">
        <div className="box1-CartItem py-2 my-1 mx-2   ">
          <div className="box-img-info ms-2  ">
            <img
              className="cartImage"
              src={`${import.meta.env.VITE_IMG_URL}/products/${cartItem.image}`}
              alt=""
            />
          </div>
          <div className="box-info ">
            <div className="box2-1-cartItem fw-bold  ">
              <div className="d-flex flex-column ">
                <p className="mb-0">{cartItem.name}</p>
                <p className="mb-0 font">
                  {" "}
                  {cartItem.artist ? cartItem.artist : ""}
                </p>{" "}
              </div>
              <p> USD {subtotal}.00</p>
            </div>
            <div className="qty-del ">
              {/* <p className="text-secondary m-0 qty ">Quantity: {quantity}</p> */}

              <div className="input-group addAndRemove ">
                {quantity > 1 ? (
                  <span
                    type="button"
                    onClick={handleDecrease}
                    className="material-symbols-outlined  button-counter height-button"
                  >
                    remove
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="material-symbols-outlined button-counter  bg-dark-subtle  height-button btn-del  text-white"
                  >
                    delete
                  </button>
                )}

                <input
                  value={quantity}
                  className=" inputCounter height-button"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="material-symbols-outlined btn-outline-secondary button-counter height-button"
                >
                  add
                </button>
              </div>
              <button
                type="button"
                onClick={handleDelete}
                className="material-symbols-outlined btn-del"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
