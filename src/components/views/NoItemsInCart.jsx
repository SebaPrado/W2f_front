import { Link } from "react-router-dom";

function NoItemsInCart() {
  return (
    <div className="container">
      <div className="box-confirmation-empty">
        <div className="img-info-confirmation-empty">
          <div className="box-image-confirmation-empty ">
            <img
              src="https://equalvision.com/cdn/shop/files/EVR_LOGO2_x117@2x.png?v=1614306916"
              alt=""
              className="mb-2 logo-confirmation"
            />
          </div>
          <div className="box-text-confirmation d-flex flex-column align-items-center  ">
            <span className="material-symbols-outlined uncheck-confirmation">
              shopping_cart_off
            </span>

            <div className="info-pay">
              <h3 className="text-center mb-5">YOUR CART IS EMPTY</h3>
              <h5 className="m-0 sm-tex-conf"></h5>
            </div>
          </div>
          <div className=" box-botton-confirmation mt-3">
            <Link to="/">
              <button type="button" className="btn btn-dark btn-order ">
                BACK TO SHOP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoItemsInCart;
