import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Divider from "../BasicComponents/Divider/Divider";
import CartItem from "./CartItem";
import LinkButton from "../BasicComponents/LinkButton/LinkButton";

const Cart = ({ cart: { cartItems } }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (cartItems.length !== 0) {
      let totalItems = 0;
      let totalPrice = 0;

      cartItems.forEach((item) => {
        totalItems += item.qty;
        totalPrice += item.qty * item.entry;
      });

      setTotalItems(totalItems);
      setTotalPrice(totalPrice);
    }
  }, [cartItems]);

  return (
    <div className="cart">
      <div className="cart-program-link-section">
        <LinkButton
          label="Back to program outline"
          href={`/program`}
          iconLeft={true}
        />
      </div>
      {cartItems.length === 0 && (
        <div className="cart-empty">
          <h3>There is nothing in the cart</h3>
        </div>
      )}
      {cartItems.length !== 0 && (
        <div className="cart-items">
          <div className="cart-list">
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <div className="cart-summary-total">
              <span>
                <span className="cart-total-items-label">Total:</span>{" "}
                {totalItems} items{" "}
              </span>
              <Divider />
              <span>
                <span className="cart-total-price-label">Price:</span>{" "}
                {totalPrice} &euro;
              </span>
            </div>
            <Divider />
            <LinkButton label="Checkout" href={`/checkout`} />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({ cart: state.cart });

export default connect(mapStateToProps)(Cart);
