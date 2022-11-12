import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {checkUserDate} from "store/date/actions";
import "./styles.scss";

type DateItemProps = {
  date: number;
  taskCount: number;
  readyCount: number;
};

function DateItem({date, taskCount, readyCount}: DateItemProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [counterStyle, setCounterStyle] = useState("item__counter lightgreen");
  const getChoosedDate = (value: number) => {
    dispatch(checkUserDate(value));
    localStorage.setItem("sessionStoryDate", String(value));
    navigate(`:${value}`);
  };
  useEffect(() => {
    setCounterStyle(() => {
      if (taskCount > 6) {
        return "item__counter orange";
      }
      if (taskCount >= 3) {
        return "item__counter yellow";
      }
      return "item__counter lightgreen";
    });
  }, [taskCount]);
  return (
    <div
      role="presentation"
      onClick={() => getChoosedDate(date)}
      className="dates__item"
    >
      <div className="item__date">{date}</div>
      <span className={counterStyle}>{taskCount}</span>
      <span className="item__readyCounter">{readyCount}</span>
    </div>
  );
}
export default DateItem;
