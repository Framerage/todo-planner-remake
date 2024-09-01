import {FC} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./styles.module.scss";
import {observer} from "mobx-react-lite";
import tasks from "store/tasks";
import cn from "classnames";

type DateItemProps = {
  date: number;
  taskCount: number;
  readyCounter: number;
};

const DateItem: FC<DateItemProps> = observer(
  ({date, taskCount, readyCounter}) => {
    const navigate = useNavigate();
    const counterStyle = () => {
      if (taskCount > 6) {
        return "orange";
      }
      if (taskCount >= 3) {
        return "yellow";
      }
      if (taskCount > 0) {
        return "lightgreen";
      }
      return "lightblue";
    };

    const readyCounterStyles = () => {
      if (readyCounter - taskCount >= 6) {
        return "readyGreen";
      }
      if (readyCounter - taskCount >= 3) {
        return "yellow";
      }
      if (readyCounter > 0) {
        return "orange";
      }
      return "lightgrey";
    };
    const getChoosedDate = () => {
      tasks.setUserDate(date);
      localStorage.setItem("sessionStoryDate", String(date));
      navigate(`:${date}`);
    };

    return (
      <div
        role="presentation"
        onClick={getChoosedDate}
        className={styles.dates__item}
      >
        <div className={styles.item__date}>{date}</div>
        <span
          className={cn({
            [styles.item__counter]: true,
            [styles[counterStyle()]]: true,
          })}
        >
          {taskCount}
        </span>
        <span
          className={cn({
            [styles.item__readyCounter]: true,
            [styles[readyCounterStyles()]]: true,
          })}
        >
          {readyCounter}
        </span>
      </div>
    );
  },
);
export default DateItem;
