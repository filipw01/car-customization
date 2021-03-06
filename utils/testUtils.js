import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import {
  reducer,
  initialState
} from "../redux/configureStore";
import ReduxThunk from "redux-thunk";

function render(
  ui,
  {
    initialState = initialState,
    store = createStore(reducer, initialState, applyMiddleware(ReduxThunk)),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
