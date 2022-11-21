import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {PATHS_BASE} from "utils/constances/constances";
import "./styles.scss";
import {useCookies} from "react-cookie";
import {createBrowserHistory} from "history";
import {selectUserName} from "store/auth/selectors";
import {dropLoginToken} from "store/auth/actions";
import user from "assets/images/user(dark).png";

type HeaderProps = {
  namePage: string;
};
function Header({namePage}: HeaderProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useSelector(selectUserName);
  const [cookies, setCookies] = useCookies(["userToken"]);
  const hist = createBrowserHistory();
  const [themeColor, setThemeColor] = useState("0");
  const onDropAuth = () => {
    dispatch(dropLoginToken(""));
    setCookies("userToken", "", {path: "todo-planner-remake/"});
    navigate(PATHS_BASE.firstPage);
    localStorage.clear();
  };
  const changeTheme = (e: any) => {
    setThemeColor(e.target.value);
    document.documentElement.style.setProperty(
      "--themeColor",
      `#${e.target.value}`,
    );
  };
  return (
    <header className="header">
      <div className="header__logo">ToDo Planner</div>
      <div className="header__content">
        <span className="content__pageName">{namePage}</span>
        <div className="content__navigation">
          <span className="userName">{loginUser}</span>
          <img role="presentation" onClick={onDropAuth} src={user} alt="user" />
        </div>
      </div>
      <div className="header__returnBtn">
        <div
          role="presentation"
          style={{
            display: !cookies.userToken ? "none" : "",
          }}
          className="returnBtn"
          onClick={() => hist.go(-1)}
        >
          {"<"}
        </div>
      </div>
      <input
        className="header__colorRange"
        type="range"
        min={0}
        max={999999}
        value={themeColor}
        onChange={changeTheme}
      />
    </header>
  );
}
export default Header;
