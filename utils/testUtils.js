import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import defaultStore, {
  initialState as reducerInitialState,
} from "../redux/configureStore";

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = defaultStore,
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
