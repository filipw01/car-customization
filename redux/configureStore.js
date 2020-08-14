import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import car, { defaultState as defaultCarState } from "./modules/car";
import ReduxThunk from "redux-thunk";

export const reducer = combineReducers({
  car,
});

export const initialState = { car: defaultCarState };

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
