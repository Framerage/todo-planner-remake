import {Route, Routes, useLocation} from "react-router-dom";
import {PATHS_BASE} from "../../utils/constants.ts";
import {ErrorPage} from "../../pages/ErrorPage/";
import Cookies from "js-cookie";
import AuthPage from "../../pages/AuthPage/";
import styles from "./styles.module.scss";
import useGettedPage from "../../hooks/usePageName.ts";
import Header from "../Header/";

const AppLayout = () => {
  const accTkn = Cookies.get("accTkn");
  const {pathname} = useLocation();
  return (
    <div className={styles.wrapper}>
      <Header namePage={useGettedPage(pathname, !!accTkn) || " "} />
      <main>
        {accTkn ? (
          <Routes>
            {/* <Route index path={PATHS_BASE.calendar} element={<Calendar />} /> */}
            <Route index path={PATHS_BASE.calendar} element={null} />
            {/* <Route path={`${PATHS_BASE.calendar}/:id`} element={<TodoList />} /> */}
            <Route path={`${PATHS_BASE.calendar}/:id`} element={null} />
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
};
export default AppLayout;
