import {FC, useCallback, useState} from "react";
import {editFirstSymbolToUpperCase} from "utils/helpers";
import cn from "classnames";
import styles from "./styles.module.scss";

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

const TodoItem: FC<TodoItemProps> = ({
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
  const [isDone, setIsDone] = useState(isTaskDone);
  const [editText, setEditText] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [typeOfText, setTypeOfText] = useState("");

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
          editTask(num, {isTaskDone: false});
        } else {
          setIsDone(true);
          editTask(num, {isTaskDone: true});
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
          editTask(id, {taskName: editFirstSymbolToUpperCase(editText)});
        } else {
          editTask(id, {
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
    <div
      className={cn(
        {
          [styles.taskDone]: isTaskDone,
        },
        styles.itemBlock,
      )}
    >
      <div
        className={cn(
          {
            [styles.invis]: !isModalActive,
          },
          styles.modalBlock,
        )}
      >
        <input
          onChange={e => {
            setEditText(e.target.value);
          }}
        />
        <button
          className={styles.modalBtn}
          type="button"
          onClick={() => {
            checkEdit(id);
          }}
        >
          OK
        </button>
        <button
          className={styles.modalBtn}
          type="button"
          onClick={() => {
            setIsModalActive(false);
          }}
        >
          x
        </button>
      </div>

      <div className={styles.todoItem}>
        <div className={styles.todoItem__text}>
          <div className={styles.text__title}>
            <span>{index}:&nbsp;</span>
            <span>{taskName}</span>
            <div
              role="presentation"
              onClick={() => activeModal("taskName")}
              className={styles.active__editBtn}
            >
              &nbsp;
            </div>
          </div>
          <div className={styles.text__descrip}>
            {taskDescrip}
            <div
              role="presentation"
              onClick={() => activeModal("taskDescrip")}
              className={styles.active__editBtn}
            >
              &nbsp;
            </div>
          </div>
        </div>
        <div className={styles.todoItem_active}>
          <div className={styles.active__kinds}>
            <div
              role="presentation"
              onClick={() => onCheckTask(id)}
              className={cn(
                {
                  [styles.taskBtnDone]: isTaskDone,
                },
                styles.active__TaskBtn,
              )}
            >
              o
            </div>
            <div
              role="presentation"
              onClick={() => onRemoveTask(id)}
              className={styles.active__removeBtn}
            >
              x
            </div>
          </div>
          <div className={styles.active__transferBtn}>
            <p
              role="presentation"
              onClick={() => transferTask(id, increaserDate)}
            >
              move to
            </p>
            <div className={styles.transferBtn__text}>
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
};
export default TodoItem;
