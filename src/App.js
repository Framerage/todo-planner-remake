import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import "./app.scss";
import {CookiesProvider} from "react-cookie";
import Layout from "components/Layout";
import store from "./store/store";

function App() {
  const changeTheme = () => {
    document.documentElement.style.setProperty(
      "--themeColor",
      `#1
    09954`,
    );
  };
  return (
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <button
            style={{fontSize: "4em", color: "white"}}
            type='button'
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
