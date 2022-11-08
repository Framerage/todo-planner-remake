import React, { useCallback, useState } from 'react';
import './todoItem.scss';
import curr from './assets/inWorking.png';
import done from './assets/done.svg';
import axios from 'axios';
import { getApi } from 'api/api';
import { pathsBack } from 'helpers/constances';
type TodoItemProps = {
  taskName: string;
  taskDescrip: string;
  index: number;
  id: number;
  isTaskDone: boolean;
  removeTask: Function;
  transferTask: Function;
  editTask: Function;
};
const TodoItem: React.FC<TodoItemProps> = ({
  taskName,
  taskDescrip,
  index,
  id,
  isTaskDone,
  removeTask,
  transferTask,
  editTask,
}) => {
  const [increaserDate, setIncreaserDate] = useState(0);
  const [isDone, setIsDone] = useState(isTaskDone || false);
  const onRemoveTask = (id: number) => {
    if (window.confirm('Are you sure?')) {
      removeTask(id);
    } else {
      alert('Think about removing');
    }
  };

  const onCheckTask = useCallback(
    (id: number) => {
      if (window.confirm('Is task ready?')) {
        setIsDone(!isDone);
        editTask(id, { isTaskDone: !isDone });
      } else {
        setIsDone(false);
        alert('Think about task');
      }
    },
    [isDone],
  );
  //TODO: убрать инлайновыйе стили, добавление классов, рабобраться с webpack file-loader for scss
  return (
    <div className={isDone ? 'todoItem taskDone' : 'todoItem'}>
      <div className="todoItem__text">
        <div className="text__title">
          <span>{index + ':'}&nbsp;</span>
          <span>{taskName}</span>
        </div>
        <div className="text__descrip">{taskDescrip}</div>
      </div>
      <div className="todoItem_active">
        <div className="active__kinds">
          <div
            onClick={() => onCheckTask(id)}
            style={{
              backgroundImage: isDone
                ? `url(${done})`
                : `url(${curr})`,
            }}
            className={
              isDone
                ? 'active__doneTaskBtn'
                : 'active__currentTaskBtn'
            }>
            o
          </div>
          <div
            onClick={() => onRemoveTask(id)}
            className="active__removeBtn">
            x
          </div>
        </div>
        <div className="active__transferBtn">
          <p onClick={() => transferTask(id, increaserDate)}>
            move to
          </p>
          <div className="transferBtn__text">
            <input
              type="number"
              value={increaserDate}
              onChange={(e) =>
                setIncreaserDate(Number(e.target.value))
              }
            />
            days
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoItem;
