import React, {useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
// import {PATHS_BASE} from "utils/constances/constances";
import styles from "./styles.module.scss";
// import {createBrowserHistory} from "history";
// import {selectUserName} from "store/auth/selectors";
// import {dropLoginToken} from "store/auth/actions";
import user from "../../assets/icons/user(dark).png";
import Cookies from "js-cookie";

type HeaderProps = {
  namePage: string;
};
function Header({namePage}: HeaderProps) {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const loginUser = useSelector(selectUserName);
  //   const [cookies, setCookies] = useCookies(["userToken"]);
  //   const hist = createBrowserHistory();
  const [themeColor, setThemeColor] = useState("0");
  const onDropAuth = () => {
    // dispatch(dropLoginToken(""));
    // setCookies("userToken", "", {path: "todo-planner-remake/"});
    // navigate(PATHS_BASE.firstPage);
    Cookies.remove("accTkn");
    localStorage.clear();
  };
  const changeTheme = (e: any) => {
    setThemeColor(e.target.value);
    document.documentElement.style.setProperty(
      "--themeColor",
      `#${e.target.value}`,
    );
  };
  const curUser = localStorage.getItem("userName");
  //TODO: авторизация, роуты
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>ToDo Planner</div>
      <div className={styles.header__content}>
        <span className={styles.content__pageName}>{namePage}</span>
        <div className={styles.content__navigation}>
          <span className={styles.userName}>{curUser}</span>
          <img role="presentation" onClick={onDropAuth} src={user} alt="user" />
        </div>
      </div>
      <div className={styles.header__returnBtn}>
        <div
          role="presentation"
          //   style={{
          //     display: !cookies.userToken ? "none" : "",
          //   }}
          className={styles.returnBtn}
          //   onClick={() => hist.go(-1)}
        >
          {"<"}
        </div>
      </div>
      <input
        className={styles.header__colorRange}
        type="range"
        min={0}
        max={9999}
        value={themeColor}
        onChange={changeTheme}
      />
    </header>
  );
}
export default Header;
