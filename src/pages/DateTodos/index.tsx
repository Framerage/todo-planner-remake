import {FC} from "react";
import {DateList} from "./DateList";
import styles from "./styles.module.scss";
import {DateFormCreating} from "./DateFormCreating";

export const DateTodos: FC = () => {
  return (
    <div className={styles.dateWrapper}>
      <DateFormCreating />
      <DateList />
    </div>
  );
};
