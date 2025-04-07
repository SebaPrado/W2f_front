import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleOffcanvas } from "../redux/offcanvasSlice";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { notify } from "../notify";
import { emptyCart } from "../redux/cartSlice";

function ShopOffcanvas({ name, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => dispatch(toggleOffcanvas());
  const handleShow = () => dispatch(toggleOffcanvas());

  const showOffcanvas = useSelector((state) => state.offcanvas);
  const userSlice = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);

  const cart = useSelector((state) => state.cart);

  const handleConfirm = () => {
    if (userSlice.token) {
      handleClose();
      if (cart.length !== 0) {
        navigate("/checkout");
      } else {
        navigate("/empty-cart");
      }
    } else {
      notify("Please log in before checkout.");
      handleClose();
      navigate("/login");
    }
  };

  const totalCartItems = cart.reduce(
    (acc, cartItem) => acc + cartItem.amount,
    0
  );

  const isLogged = () => {
    if (token) {
      return (
        <button
          className="btn  btn-cart w-100"
          onClick={(handleClose, handleConfirm)}
        >
          Checkout
        </button>
      );
    } else {
      return (
        <button
          className="btn  btn-cart w-100"
          onClick={(handleClose, handleConfirm)}
        >
          <div className=" icon-checkout">
            <span className="material-symbols-outlined icon-checkout">
              lock
            </span>
          </div>
          Checkout
        </button>
      );
    }
  };

  return (
    <>
      <div className="cart-icon-container" onClick={handleShow}>
        <FontAwesomeIcon
          icon={faCartShopping}
          color="white"
          size="lg"
          type="button"
          className="nav-items size-icon-nav-2 "
        />
        {totalCartItems > 0 && (
          <span className="cart-item-count">{totalCartItems}</span>
        )}
      </div>
      <Offcanvas
        show={showOffcanvas}
        onHide={handleClose}
        {...props}
        className="offcanvas"
      >
        <Offcanvas.Header
          className="offcanvas-header head-offCanvas"
          closeButton
        >
          <Offcanvas.Title className="fw-bold">Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <hr className="mx-3 my-0" />
        <Offcanvas.Body className="offcanvas-body ">
          <div className="section-total">
            <div
              className="cart_empty"
              style={{
                visibility: cart.length === 0 ? "visible" : "hidden",
              }}
            >
              {" "}
              <div className="container">
                <div className="box-confirmation">
                  <div className="img-info-confirmation">
                    {/* <div className="box-image-confirmation">
                      <img
                        src="https://equalvision.com/cdn/shop/files/EVR_LOGO2_x117@2x.png?v=1614306916"
                        alt=""
                        className="mb-2 logo-confirmation"
                      />
                    </div> */}
                    <div className="box-text-confirmation d-flex flex-column align-items-center box_empty_cart">
                      <span className="material-symbols-outlined uncheck-confirmation text-dark">
                        shopping_cart_off
                      </span>

                      <div className="info-pay">
                        <h3 className="text-center mb-5">YOUR CART IS EMPTY</h3>
                        <h5 className="m-0 sm-tex-conf text-center">
                          Looks like your shopping cart is empty, give it some
                          love!
                        </h5>
                      </div>
                    </div>
                    <div className=" box-botton-confirmation mt-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="ul-list scroll-v">
              {cart.map((cartItem) => (
                <li key={cartItem.id}>
                  <CartItem cartItem={cartItem} />
                </li>
              ))}
            </ul>

            <hr />

            <div className="d-flex justify-content-between">
              <h5 className="fw-bold">Total</h5>
              <div className="m-tot">
                <p className="fw-bold">
                  {" "}
                  USD{" "}
                  {cart.reduce(
                    (acc, cartItem) => acc + cartItem.price * cartItem.amount,
                    0
                  )}
                </p>
              </div>
            </div>
            <p className="leyend mb-3 ">
              Shipping and taxes calculated at checkout.
            </p>

            {isLogged()}
            <p className="text-center mt-2">
              or{" "}
              <Link to="/products" className="forShop" onClick={handleClose}>
                Continue shopping
              </Link>
            </p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ShopOffcanvas;
