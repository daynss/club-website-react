import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { connect } from "react-redux";

const Navbar = ({ cart }) => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    const cartQty =
      cart.cartItems.length !== 0
        ? cart.cartItems.reduce((acc, item) => {
            return acc + item.qty;
          }, 0)
        : 0;

    setCartQty(cartQty);
  }, [cart]);

  const handleClick = () => {
    setMobileMenuVisible((mobileMenuVisible) => !mobileMenuVisible);
  };

  return (
  <>
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-responsive">
          <div className="logo">
            <Link
              className="nav-link"
              to="/"
              onClick={mobileMenuVisible ? handleClick : null}
            >
              Imaginarium Club
            </Link>
          </div>
          <div className="nav-icons">
            <Link
              className="checkout-link"
              activeClassName="active"
              onClick={mobileMenuVisible ? handleClick : null}
              to="/cart"
            >
              <MdShoppingCart />
              <span>({cartQty})</span>
            </Link>

            <div
              onClick={handleClick}
              className={`menu-icon ${mobileMenuVisible ? "cross" : ""}`}
            >
              <span />
              <span />
              <span />
            </div>
          </div>{" "}
        </div>
        <div
          className={`navbar-links ${mobileMenuVisible ? "visible" : "hidden"}`}
        >
          <ul>
            <li>
              <Link
                className="nav-link"
                exact
                activeClassName="active"
                to="/"
                onClick={mobileMenuVisible ? handleClick : null}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                activeClassName="active"
                to="/program"
                onClick={mobileMenuVisible ? handleClick : null}
              >
                Program
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                activeClassName="active"
                to="/contact"
                onClick={mobileMenuVisible ? handleClick : null}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="nav-link checkout-link"
                activeClassName="active"
                onClick={mobileMenuVisible ? handleClick : null}
                to="/cart"
              >
                <MdShoppingCart />
                <div>
                  <span>Cart</span>
                  <span>({cartQty})</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
    </>
  );
};

const mapStateToProps = (state) => {
  return { cart: state.cart };
};
export default connect(mapStateToProps)(Navbar);
