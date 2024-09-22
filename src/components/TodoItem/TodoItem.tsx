import {FC, memo, useCallback, useState} from "react";
import {editFirstSymbolToUpperCase} from "utils/helpers";
import cn from "classnames";
import {useForm} from "react-hook-form";
import styles from "./styles.module.scss";

type TodoItemProps = {
  taskName: string;
  taskDescrip: string;
  index: number;
  id: number;
  isTaskDone: boolean;
  removeTask: (id: number) => void;
  transferTask: Function;
  editTask: Function;
};
type TFormKeys = "taskName" | "taskDescrip";
interface IEditForm {
  taskName?: string;
  taskDescrip?: string;
}
const TodoItem: FC<TodoItemProps> = memo(
  ({
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
    const [isModalActive, setIsModalActive] = useState(false);
    const [typeOfText, setTypeOfText] = useState<TFormKeys>("taskName");

    const {register, handleSubmit} = useForm<IEditForm>();
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
          if (isDone) {
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
      (type: TFormKeys) => {
        setTypeOfText(type);
        setIsModalActive(true);
      },
      [isModalActive, typeOfText],
    );

    const handleEditTask = useCallback(
      (data: IEditForm) => {
        if (!data[typeOfText]) {
          alert("Fill field");
          return;
        }
        editTask(id, {
          [typeOfText]: editFirstSymbolToUpperCase(data[typeOfText]),
        });
        setIsModalActive(false);
      },
      [typeOfText],
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
        <form
          onSubmit={handleSubmit(handleEditTask)}
          className={cn(
            {
              [styles.invis]: !isModalActive,
            },
            styles.modalBlock,
          )}
        >
          <input {...register(typeOfText, {required: true})} />
          <button className={styles.modalBtn}>OK</button>
          <button
            className={styles.modalBtn}
            type="button"
            onClick={() => setIsModalActive(false)}
          >
            x
          </button>
        </form>

        <div className={styles.todoItem}>
          <div className={styles.todoItem__text}>
            <div className={styles.text__title}>
              <span>{index}:&nbsp;</span>
              <span>{taskName}</span>
              <button
                role="presentation"
                onClick={() => activeModal("taskName")}
                className={styles.active__editBtn}
              >
                &nbsp;
              </button>
            </div>
            <div className={styles.text__descrip}>
              {taskDescrip}
              <button
                role="presentation"
                onClick={() => activeModal("taskDescrip")}
                className={styles.active__editBtn}
              >
                &nbsp;
              </button>
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
  },
);
export default TodoItem;
