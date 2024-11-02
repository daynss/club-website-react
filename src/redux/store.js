import { createStore, combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import cartReducer from "./Cart/cartReducer";

const rootReducer = combineReducers({
  // form: formReducer,
  cart: cartReducer,
});
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
