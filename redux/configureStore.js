import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import car from "./modules/car";
import ReduxThunk from "redux-thunk";

const reducer = combineReducers({
  car,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
