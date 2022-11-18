import Error from "components/Error/Error";
import AuthPage from "pages/Authorisation/AuthPage";
import React, {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {PATHS_BASE} from "constances/constances";
import Header from "components/Header/Header";
import "./styles.scss";
import Calendar from "pages/Calendar";
import TodoList from "pages/TodoList";
import {createBrowserHistory} from "history";
import {useCookies} from "react-cookie";
import useGettedPage from "hooks/usePageName";

function Layout() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["userToken"]);
  const hist = createBrowserHistory();
  useEffect(() => {
    if (
      cookies.userToken &&
      hist.location.pathname !== "todo-planner-remake/&nbsp;"
    ) {
      navigate(PATHS_BASE.calendar);
    } else {
      navigate(hist.location.pathname);
    }
  }, [cookies.userToken]);

  const {pathname} = useLocation();
  return (
    <div className="wrapper">
      <Header namePage={useGettedPage(pathname, !!cookies.userToken) || " "} />
      {!!cookies.userToken ? (
        <Routes>
          <Route index path={PATHS_BASE.calendar} element={<Calendar />} />
          <Route path={`${PATHS_BASE.calendar}/:id`} element={<TodoList />} />
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
