import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkChoosedDate } from 'store/actions/dateActions';
import './styles.scss';

type DateItemProps = {
  date: number;
  taskCount: number | string;
};

const DateItem: React.FC<DateItemProps> = ({ date, taskCount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getChoosedDate = (value: number) => {
    dispatch(checkChoosedDate(value));
    localStorage.setItem('sessionStoryDate', String(value));
    navigate(`:${value}`);
  };
  //TODO: отдельные класс на инлайн стили
  return (
    <div onClick={() => getChoosedDate(date)} className="dates__item">
      <div className="item__date">{date}</div>
      <span
        style={{
          backgroundColor:
            taskCount > 6
              ? 'orange'
              : taskCount >= 3
              ? 'yellow'
              : 'lightgreen',
        }}
        className="item__counter">
        {taskCount}
      </span>
    </div>
  );
};
export default DateItem;
