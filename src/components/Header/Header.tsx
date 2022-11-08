import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {pathsBase} from "constances/constances";
import "./styles.scss";
import {useCookies} from "react-cookie";
import {createBrowserHistory} from "history";
import {selectUserName} from "store/auth/selectors";
import user from "../../assets/images/user(dark).png";

// TODO: сгрупировать иморты + перевести все пути на абсолютные + можно поискать правила для авто-группировки

type HeaderProps = {
  namePage: string;
};
function Header({namePage}: HeaderProps) {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useSelector(selectUserName);
  const [cookies, removeCookies] = useCookies(["userToken"]);
  const hist = createBrowserHistory();

  const onDropAuth = () => {
    // dispatch(checkAuth(false));
    removeCookies("userToken", "");
    // localStorage.clear();
    localStorage.removeItem("userCookies");
    // localStorage.setItem('userCookies', '');
    navigate(pathsBase.firstPage);
  };
  return (
    <header className='header'>
      <div className='header__logo'>ToDo Planner</div>
      <div className='header__content'>
        <span className='content__pageName'>{namePage}</span>
        <div className='content__navigation'>
          <span className='userName'>{loginUser}</span>
          <img onClick={onDropAuth} src={user} alt='user' />
        </div>
      </div>
      <div className='header__returnBtn'>
        <div
          style={{
            display: !cookies.userToken ? "none" : "",
          }}
          className='returnBtn'
          onClick={hist.back}
        >
          {"<"}
        </div>
      </div>
    </header>
  );
}
export default Header;
