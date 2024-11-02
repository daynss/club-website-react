import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_QTY,
  CLEAR_CART,
} from "../types";

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: { id: itemId },
});

export const changeQuantity = (itemId, value) => ({
  type: CHANGE_QTY,
  payload: { id: itemId, qty: value },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
