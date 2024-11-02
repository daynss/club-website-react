import React, { useState } from "react";
import { connect } from "react-redux";
import { removeFromCart, changeQuantity } from "../../redux/Cart/cartActions";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Divider from "../BasicComponents/Divider/Divider";
import Button from "../BasicComponents/Button/Button";
import Artist from "../Artists/Artist";
import NumberSelector from "../BasicComponents/NumberSelector/NumberSelector";

const CartItem = ({ cartItem, removeFromCart, changeQuantity }) => {
  const { id, artist, title, day, date, time, entry, qty, category_id } =
    cartItem;
  const [itemQuantity, setItemQuantity] = useState(qty);

  const changeQuantityHandler = (e) => {
    setItemQuantity(e.target.value);
    changeQuantity(id, Number(e.target.value));
  };

  return (
    <div key={id} className="cart-list-item">
      <div className="cart-list-item-content">
        <div className="cart-list-item-event">
          <Link to={`/detail/${id}`}>
            <h2>{title}</h2>{" "}
          </Link>
          <span>
            {day}, {date} {time ? "at " + time : " "}
          </span>
          <Divider />
          <Artist artists={artist} category={category_id} inline />
          <Divider />
          <span>{entry} &euro; </span>
        </div>
        <div className="cart-list-item-actions">
          <NumberSelector
            qty={itemQuantity === 0 ? 1 : itemQuantity}
            onQtyChange={changeQuantityHandler}
          />
          <Button
            label={"Remove"}
            kind="danger"
            renderIcon={<FaTrash size={18} />}
            onClick={() => removeFromCart(id)}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({ cart: state.cart });

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (id) => dispatch(removeFromCart(id)),
  changeQuantity: (id, value) => dispatch(changeQuantity(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
