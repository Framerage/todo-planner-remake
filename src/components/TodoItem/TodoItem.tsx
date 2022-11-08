import React, {useCallback, useState} from "react";
import "./todoItem.scss";

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
function TodoItem({
  taskName,
  taskDescrip,
  index,
  id,
  isTaskDone,
  removeTask,
  transferTask,
  editTask,
}: TodoItemProps) {
  const [increaserDate, setIncreaserDate] = useState(0);
  const [isDone, setIsDone] = useState(isTaskDone || false);
  const onRemoveTask = (num: number) => {
    if (window.confirm("Are you sure?")) {
      removeTask(num);
    } else {
      window.alert("Think about removing");
    }
  };

  const onCheckTask = useCallback(
    (num: number) => {
      if (window.confirm("Is task ready?")) {
        setIsDone(!isDone);
        editTask(num, {isTaskDone: !isDone});
      } else {
        setIsDone(false);
        window.alert("Think about task");
      }
    },
    [isDone],
  );
  // TODO: убрать инлайновыйе стили, добавление классов, рабобраться с webpack file-loader for scss
  return (
    <div className={isDone ? "todoItem taskDone" : "todoItem"}>
      <div className='todoItem__text'>
        <div className='text__title'>
          <span>
            {`${index}:`}
            &nbsp;
          </span>
          <span>{taskName}</span>
        </div>
        <div className='text__descrip'>{taskDescrip}</div>
      </div>
      <div className='todoItem_active'>
        <div className='active__kinds'>
          <div
            onClick={() => onCheckTask(id)}
            className={
              isDone ? "active__doneTaskBtn" : "active__currentTaskBtn"
            }
          >
            o
          </div>
          <div onClick={() => onRemoveTask(id)} className='active__removeBtn'>
            x
          </div>
        </div>
        <div className='active__transferBtn'>
          <p onClick={() => transferTask(id, increaserDate)}>move to</p>
          <div className='transferBtn__text'>
            <input
              type='number'
              value={increaserDate}
              onChange={e => setIncreaserDate(Number(e.target.value))}
            />
            days
          </div>
        </div>
      </div>
    </div>
  );
}
export default TodoItem;
