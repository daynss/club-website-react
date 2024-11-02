import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_QTY,
  CLEAR_CART,
} from "../types";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const isInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        cartItems: isInCart
          ? state.cartItems.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cartItems, { ...action.payload, qty: 1 }],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case CHANGE_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
