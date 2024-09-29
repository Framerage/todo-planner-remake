import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {CLOSE_ROUTES} from "utils/constants.ts";
import UserIcon from "assets/icons/user(dark).png";
import styles from "./styles.module.scss";

type HeaderProps = {
  namePage: string;
};
function Header({namePage}: HeaderProps) {
  const navigate = useNavigate();
  const backArrow = useRef<HTMLButtonElement | null>(null);

  const onDropAuth = () => {
    Cookies.remove("accTkn");
    localStorage.clear();
    navigate(CLOSE_ROUTES.home.path);
  };

  useEffect(() => {
    window.addEventListener("keydown", event => {
      if (event.code === "Escape") {
        navigate(-1);
      }
    });
    return () => window.removeEventListener("keydown", () => {});
  }, []);

  const curUser = localStorage.getItem("userName");
  return (
    <header className={styles.header}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.logo}>ToDo Planner</h1>
        <div className={styles.infoContent}>
          <span className={styles.pageName}>{namePage}</span>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{curUser}</span>
            <button className={styles.authBtn}>
              <img
                role="presentation"
                onClick={onDropAuth}
                src={UserIcon}
                alt="user"
              />
            </button>
          </div>
        </div>
        <nav className={styles.navigation}>
          <button
            ref={backArrow}
            role="navigation_arrow"
            style={{
              display: !Cookies.get("accTkn") ? "none" : "",
            }}
            className={styles.navigationArrow}
            onClick={() => navigate(-1)}
          >
            {"<"}
          </button>
        </nav>
      </div>
    </header>
  );
}
export default Header;
