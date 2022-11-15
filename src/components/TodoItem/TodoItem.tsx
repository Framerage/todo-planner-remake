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
  const [isDone, setIsDone] = useState(isTaskDone);
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
        if (isDone === true) {
          setIsDone(false);
          editTask(num, false);
        } else {
          setIsDone(true);
          editTask(num, true);
        }
      } else {
        setIsDone(false);
        window.alert("Think about task");
      }
    },
    [isDone],
  );
  return (
    <div className={isTaskDone ? "todoItem taskDone" : "todoItem"}>
      <div className="todoItem__text">
        <div className="text__title">
          <span>{index}:&nbsp;</span>
          <span>{taskName}</span>
        </div>
        <div className="text__descrip">{taskDescrip}</div>
      </div>
      <div className="todoItem_active">
        <div className="active__kinds">
          <div
            role="presentation"
            onClick={() => onCheckTask(id)}
            className={
              isTaskDone ? "active__TaskBtn taskBtnDone" : "active__TaskBtn"
            }
          >
            o
          </div>
          <div
            role="presentation"
            onClick={() => onRemoveTask(id)}
            className="active__removeBtn"
          >
            x
          </div>
        </div>
        <div className="active__transferBtn">
          <p
            role="presentation"
            onClick={() => transferTask(id, increaserDate)}
          >
            move to
          </p>
          <div className="transferBtn__text">
            <input
              type="number"
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
