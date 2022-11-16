import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {PATHS_BASE} from "constances/constances";
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

  const onDropAuth = () => {
    dispatch(dropLoginToken(""));
    setCookies("userToken", "", {path: "todo-planner-remake/"});
    navigate(PATHS_BASE.firstPage);
    localStorage.clear();
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
    </header>
  );
}
export default Header;
