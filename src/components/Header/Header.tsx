import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {CLOSE_ROUTES} from "utils/constants.ts";
import styles from "./styles.module.scss";
import user from "../../assets/icons/user(dark).png";

type HeaderProps = {
  namePage: string;
};
function Header({namePage}: HeaderProps) {
  const navigate = useNavigate();
  const onDropAuth = () => {
    Cookies.remove("accTkn");
    localStorage.clear();
    navigate(CLOSE_ROUTES.home.path);
  };

  const curUser = localStorage.getItem("userName");
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
          style={{
            display: !Cookies.get("accTkn") ? "none" : "",
          }}
          className={styles.returnBtn}
          onClick={() => navigate(-1)}
        >
          {"<"}
        </div>
      </div>
    </header>
  );
}
export default Header;
