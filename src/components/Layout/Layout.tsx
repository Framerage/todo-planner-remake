import Error from 'components/Error/Error';
import AuthPage from 'pages/Authorisation/AuthPage';
import React, { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { pathsBase } from 'helpers/constances';
import { getPageName } from 'helpers/helpers';
import Header from 'components/Header/Header';
import './styles.scss';
// import { useCookies } from 'react-cookie';
import Calendar from 'pages/Calendar';
import TodoList from 'pages/TodoList';
import { createBrowserHistory } from 'history';
import { useCookies } from 'react-cookie';
//TODO: edit all files for cookies

const Layout: React.FC = () => {
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(['userToken']);
  const hist = createBrowserHistory();
  console.log({ cookies });
  useEffect(() => {
    if (
      !!localStorage.userCookies
      // &&hist.location.pathname!==pathsBase.calendar
    ) {
      hist.go(1);
    } else {
      navigate(pathsBase.calendar);
    }
  }, [isAuthSuccess, localStorage.userCookies]);
  const { pathname } = useLocation();
  return (
    <div className="wrapper">
      <Header
        namePage={
          getPageName(pathname, !!localStorage.userCookies) || ' '
        }
      />
      {!!localStorage.userCookies ? (
        <Routes>
          <Route
            index
            path={pathsBase.calendar}
            element={<Calendar />}
          />
          <Route
            path={pathsBase.calendar + '/:id'}
            element={<TodoList />}
          />
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
};
export default Layout;
