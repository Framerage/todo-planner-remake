import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import "./app.scss";
import Layout from "components/Layout";

import {CookiesProvider} from "react-cookie";
import store from "./store/store";

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  );
}
export default App;
