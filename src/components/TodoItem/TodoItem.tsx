import {editFirstSymbolToUpperCase} from "helpers/helpers";
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

function TodoItem({...props}: TodoItemProps) {
  const [increaserDate, setIncreaserDate] = useState(0);
  const [isDone, setIsDone] = useState(props.isTaskDone);
  const [editText, setEditText] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [typeOfText, setTypeOfText] = useState("");
  const onRemoveTask = (num: number) => {
    if (window.confirm("Are you sure?")) {
      props.removeTask(num);
    } else {
      window.alert("Think about removing");
    }
  };

  const onCheckTask = useCallback(
    (num: number) => {
      if (window.confirm("Is task ready?")) {
        if (isDone === true) {
          setIsDone(false);
          props.editTask(num, {isTaskDone: false});
        } else {
          setIsDone(true);
          props.editTask(num, {isTaskDone: true});
        }
      } else {
        setIsDone(false);
        window.alert("Think about task");
      }
    },
    [isDone],
  );
  const activeModal = useCallback(
    (type: string) => {
      setTypeOfText(type);
      setIsModalActive(true);
    },
    [isModalActive, typeOfText],
  );

  const checkEdit = useCallback(
    (id: number) => {
      if (!editText.length) {
        alert("Fill field");
      } else {
        if (typeOfText === "taskName") {
          props.editTask(id, {taskName: editFirstSymbolToUpperCase(editText)});
        } else {
          props.editTask(id, {
            taskDescrip: editFirstSymbolToUpperCase(editText),
          });
        }
        setIsModalActive(false);
        setEditText("");
      }
    },
    [editText, typeOfText],
  );
  return (
    <div className="itemBlock">
      <div className={isModalActive ? "modalBlock" : "modalBlock invis"}>
        <input
          onChange={e => {
            setEditText(e.target.value);
          }}
        />
        <button
          className="modalBtn"
          type="button"
          onClick={() => {
            checkEdit(props.id);
          }}
        >
          OK
        </button>
        <button
          className="modalBtn"
          type="button"
          onClick={() => {
            setIsModalActive(false);
          }}
        >
          x
        </button>
      </div>

      <div className={props.isTaskDone ? "todoItem taskDone" : "todoItem"}>
        <div className="todoItem__text">
          <div className="text__title">
            <span>{props.index}:&nbsp;</span>
            <span>{props.taskName}</span>
            <div
              role="presentation"
              onClick={() => activeModal("taskName")}
              className="active__editBtn"
            >
              &nbsp;
            </div>
          </div>
          <div className="text__descrip">
            {props.taskDescrip}
            <div
              role="presentation"
              onClick={() => activeModal("taskDescrip")}
              className="active__editBtn"
            >
              &nbsp;
            </div>
          </div>
        </div>
        <div className="todoItem_active">
          <div className="active__kinds">
            <div
              role="presentation"
              onClick={() => onCheckTask(props.id)}
              className={
                props.isTaskDone
                  ? "active__TaskBtn taskBtnDone"
                  : "active__TaskBtn"
              }
            >
              o
            </div>
            <div
              role="presentation"
              onClick={() => onRemoveTask(props.id)}
              className="active__removeBtn"
            >
              x
            </div>
          </div>
          <div className="active__transferBtn">
            <p
              role="presentation"
              onClick={() => props.transferTask(props.id, increaserDate)}
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
    </div>
  );
}
export default TodoItem;
