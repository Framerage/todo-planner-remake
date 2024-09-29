import {FC, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import tasks from "store/tasks";
import cn from "classnames";
import styles from "./styles.module.scss";

type DateItemProps = {
  date: number;
  taskCount: number;
  readyCounter: number;
};

const DateItem: FC<DateItemProps> = observer(
  ({date, taskCount, readyCounter}) => {
    const dateRef = useRef<HTMLButtonElement | null>(null);
    const navigate = useNavigate();
    const lastItem = localStorage.getItem("sessionStoryDate");

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
      tasks.setSelectedDate(date);
      localStorage.setItem("sessionStoryDate", String(date));
      navigate(`:${date}`);
    };

    useEffect(() => {
      if (dateRef && dateRef.current && lastItem) {
        if (lastItem === String(date)) {
          dateRef?.current?.focus();
        }
      }
    }, [dateRef, lastItem]);
    return (
      <button
        role="presentation"
        onClick={getChoosedDate}
        className={styles.dates__item}
        ref={dateRef}
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
      </button>
    );
  },
);
export default DateItem;
