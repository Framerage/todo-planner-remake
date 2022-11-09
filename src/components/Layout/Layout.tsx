import Error from "components/Error/Error";
import AuthPage from "pages/Authorisation/AuthPage";
import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {pathsBase} from "constances/constances";
import {getPageName} from "helpers/helpers";
import Header from "components/Header/Header";
import "./styles.scss";
// import { useCookies } from 'react-cookie';
import Calendar from "pages/Calendar";
import TodoList from "pages/TodoList";
import {createBrowserHistory} from "history";
import {useCookies} from "react-cookie";
// TODO: edit all files for cookies

function Layout() {
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["userToken"]);
  const hist = createBrowserHistory();
  // console.log({cookies});
  useEffect(() => {
    if (
      cookies.userToken
      // &&hist.location.pathname!==pathsBase.calendar
    ) {
      localStorage.setItem("isAuthSuccess", `${isAuthSuccess}`);
      navigate(pathsBase.calendar);
      console.log("layout d");
    } else {
      hist.go(1);
      console.log("layout 1");
    }
  }, [cookies.userToken]);

  // console.log(cookies.userToken, "token");
  const {pathname} = useLocation();
  return (
    <div className="wrapper">
      <Header namePage={getPageName(pathname, !!cookies.userToken) || " "} />
      {!!cookies.userToken ? (
        <Routes>
          <Route index path={pathsBase.calendar} element={<Calendar />} />
          <Route path={`${pathsBase.calendar}/:id`} element={<TodoList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            index
            path="*"
            element={<AuthPage setIsAuthSuccess={setIsAuthSuccess} />}
          />
        </Routes>
      )}
    </div>
  );
}
export default Layout;
