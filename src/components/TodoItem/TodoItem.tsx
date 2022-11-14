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
  // console.log(isTaskDone, " isTaskDone from todoitem");
  const [increaserDate, setIncreaserDate] = useState(0);
  const [isDone, setIsDone] = useState(false);
  // const []
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
        // setIsDone(!isDone);
        // console.log(!isDone, "is done");
        // dispatch(editChoosedTask({id: num, param: {isTaskDone: !isDone}}));
      } else {
        setIsDone(false);
        // editTask(num, !isDone);

        window.alert("Think about task");
      }
    },
    [isDone],
  );
  // TODO: убрать инлайновыйе стили, добавление классов, рабобраться с webpack file-loader for scss
  return (
    <div className={isTaskDone ? "todoItem taskDone" : "todoItem"}>
      <div className="todoItem__text">
        <div className="text__title">
          <span>
            {`${index}:`}
            &nbsp;
          </span>
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
              isDone ? "active__doneTaskBtn" : "active__currentTaskBtn"
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
