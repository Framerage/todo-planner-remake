import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.ts";
import "./app.scss";
import { CookiesProvider } from "react-cookie";
import Layout from "components/Layout";

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
