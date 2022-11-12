import Error from "components/Error/Error";
import AuthPage from "pages/Authorisation/AuthPage";
import React, {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {pathsBase} from "constances/constances";
import {getPageName} from "helpers/helpers";
import Header from "components/Header/Header";
import "./styles.scss";
import Calendar from "pages/Calendar";
import TodoList from "pages/TodoList";
import {createBrowserHistory} from "history";
import {useCookies} from "react-cookie";

function Layout() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["userToken"]);
  const hist = createBrowserHistory();
  useEffect(() => {
    if (cookies.userToken && hist.location.pathname !== "/&nbsp;") {
      navigate(pathsBase.calendar);
    } else {
      navigate(hist.location.pathname);
    }
  }, [cookies.userToken]);

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
          <Route index path="*" element={<AuthPage />} />
        </Routes>
      )}
    </div>
  );
}
export default Layout;
