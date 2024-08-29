import {useState, useEffect, FC} from "react";
// import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
// import {checkUserDate} from "store/date/actions";
import styles from "./styles.module.scss";

type DateItemProps = {
  date: number;
  taskCount: number;
  readyCounter: number;
};

const DateItem: FC<DateItemProps> = ({date, taskCount, readyCounter}) => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [counterStyle, setCounterStyle] = useState(` lightgreen`);
  const getChoosedDate = (value: number) => {
    // dispatch(checkUserDate(value));
    localStorage.setItem("sessionStoryDate", String(value));
    navigate(`:${value}`);
  };
  useEffect(() => {
    setCounterStyle(() => {
      if (taskCount > 6) {
        return " orange";
      }
      if (taskCount >= 3) {
        return " yellow";
      }
      return " lightgreen";
    });
  }, [taskCount]);
  return (
    <div
      role="presentation"
      onClick={() => getChoosedDate(date)}
      className={styles.dates__item}
    >
      <div className={styles.item__date}>{date}</div>
      <span className={`${styles.item__counter} ${counterStyle}`}>
        {taskCount}
      </span>
      <span className={styles.item__readyCounter}>{readyCounter}</span>
    </div>
  );
};
export default DateItem;
