import {Route, Routes, useLocation} from "react-router-dom";
import {ErrorPage} from "pages/ErrorPage/";
import Cookies from "js-cookie";
import AuthPage from "pages/AuthPage/";
import styles from "./styles.module.scss";
import useGettedPage from "hooks/usePageName.ts";
import Header from "../Header/";
import {CLOSE_ROUTES, PATHS_BASE} from "utils/constants.ts/index.ts";
import authStore from "store/auth.ts";
import {observer} from "mobx-react-lite";
import {MainPage} from "pages/Main/";
import Calendar from "pages/Calendar";
import ItemTodos from "components/ItemTodos";

const AppLayout = observer(() => {
  const accTkn = Cookies.get("accTkn");
  const {pathname} = useLocation();
  return (
    <div className={styles.wrapper}>
      <Header namePage={useGettedPage(pathname, !!accTkn) || " "} />
      <main>
        {authStore.isAuth ? (
          <Routes>
            {/* <Route index path={PATHS_BASE.calendar} element={<Calendar />} /> */}
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
