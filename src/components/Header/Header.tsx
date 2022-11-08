import { checkAuth } from "store/auth/actions";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { pathsBase } from "helpers/constances";
import user from "../../assets/images/user(dark).png";
import "./styles.scss";
import { useCookies } from "react-cookie";
import { createBrowserHistory } from "history";
import { selectUserName } from "store/auth/selectors";

// TODO: сгрупировать иморты + перевести все пути на абсолютные + можно поискать правила для авто-группировки

//TODO: настроить webpack(eslint) чтобы ругался на неиспользуемыве файлы в ТС

// import { selectLoginUser } from '../../testStore/selectors';
type HeaderProps = {
  namePage: string;
};
const Header: React.FC<HeaderProps> = ({ namePage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useSelector(selectUserName);
  const [cookies, removeCookies, setCookies] = useCookies(["userToken"]);
  const hist = createBrowserHistory();

  const onDropAuth = () => {
    //dispatch(checkAuth(false));
    removeCookies("userToken", "");
    // localStorage.clear();
    localStorage.removeItem("userCookies");
    //localStorage.setItem('userCookies', '');
    navigate(pathsBase.firstPage);
  };
  return (
    <header className="header">
      <div className="header__logo">ToDo Planner</div>
      <div className="header__content">
        <span className="content__pageName">{namePage}</span>
        <div className="content__navigation">
          <span className="userName">{loginUser}</span>
          <img onClick={onDropAuth} src={user} alt="user" />
        </div>
      </div>
      <div className="header__returnBtn">
        <div
          style={{
            display: !Boolean(localStorage.userCookies) ? "none" : "",
          }}
          className="returnBtn"
          onClick={hist.back}
        >
          {"<"}
        </div>
      </div>
    </header>
  );
};
export default Header;
