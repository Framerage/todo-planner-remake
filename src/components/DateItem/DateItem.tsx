import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {checkChoosedDate} from "store/actions/dateActions";
import "./styles.scss";

type DateItemProps = {
  date: number;
  taskCount: number;
};

function DateItem({date, taskCount}: DateItemProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [counterStyle, setCounterStyle] = useState("item__counter lightgreen");
  const getChoosedDate = (value: number) => {
    dispatch(checkChoosedDate(value));
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
    <div onClick={() => getChoosedDate(date)} className='dates__item'>
      <div className='item__date'>{date}</div>
      <span className={counterStyle}>{taskCount}</span>
    </div>
  );
}
export default DateItem;
