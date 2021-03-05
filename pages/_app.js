import "../css/index.css";
import { Provider } from "react-redux";
import store from "../redux/configureStore";
import React from "react";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default App;
