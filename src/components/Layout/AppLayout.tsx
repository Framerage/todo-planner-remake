import {Route, Routes, useLocation} from "react-router-dom";
import {ErrorPage} from "pages/ErrorPage/";
import Cookies from "js-cookie";
import AuthPage from "pages/AuthPage/";
import styles from "./styles.module.scss";
import useGettedPage from "hooks/usePageName.ts";
import Header from "../Header/";
import {CLOSE_ROUTES} from "utils/constants.ts/index.ts";
import authStore from "store/auth.ts";
import {observer} from "mobx-react-lite";
import {MainPage} from "pages/Main/";
import {Calendar} from "pages/Calendar";
import {useEffect} from "react";
import ItemTodos from "pages/ItemTodos";

const AppLayout = observer(() => {
  const accTkn = Cookies.get("accTkn");
  const {pathname} = useLocation();
  useEffect(() => {
    if (!accTkn && authStore.isAuth) {
      authStore.resetAuth();
      return;
    }
    if (!authStore.isAuth && accTkn) {
      authStore.setAuth(true);
      return;
    }
  }, [accTkn, authStore.isAuth]);
  return (
    <div className={styles.wrapper}>
      <Header namePage={useGettedPage(pathname, !!accTkn) || " "} />

      <main>
        {authStore.isAuth ? (
          <Routes>
            <Route path={CLOSE_ROUTES.calendar.path} element={<Calendar />} />
            <Route
              index={CLOSE_ROUTES.home.isIndex}
              path={CLOSE_ROUTES.home.path}
              element={<MainPage />}
            />
            <Route
              path={`${CLOSE_ROUTES.calendar.path}/:id`}
              element={<ItemTodos />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route index path="*" element={<AuthPage />} />
          </Routes>
        )}
      </main>
    </div>
  );
});
export default AppLayout;
