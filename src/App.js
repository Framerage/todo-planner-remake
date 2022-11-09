import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import "./app.scss";
import Layout from "components/Layout";

import {CookiesProvider} from "react-cookie";
import store from "./store/store";

function App() {
  const changeTheme = () => {
    document.documentElement.style.setProperty("--themeColor", "#109954");
  };
  return (
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <button
            type="button"
            style={{fontSize: "4em", color: "white"}}
            onClick={changeTheme}
          >
            color
          </button>
          <Layout />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  );
}
export default App;
