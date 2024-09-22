import {FC} from "react";
import {Link} from "react-router-dom";
import {CLOSE_ROUTES} from "utils/constants.ts";
import styles from "./styles.module.scss";

export const MainPage: FC = () => {
  return (
    <ul className={styles.mainMenu}>
      <li>
        <Link to="" className={styles.menuItem}>
          Raiting
        </Link>
      </li>
      <li>
        <Link to={CLOSE_ROUTES.calendar.endpoint} className={styles.menuItem}>
          Calendar
        </Link>
      </li>
    </ul>
  );
};
