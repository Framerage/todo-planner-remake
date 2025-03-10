import {FC, memo, useCallback, useRef, useState} from "react";
import {editFirstSymbolToUpperCase} from "utils/helpers";
import cn from "classnames";
import {useOnClickOutside} from "hooks/useClickOutside";
import {useForm} from "react-hook-form";
import StepBtn from "components/StepBtn/StepBtn";
import Calendar from "react-calendar";
import tasksStore from "store/tasks.ts";
import styles from "./styles.module.scss";

type TodoItemProps = {
  taskName: string;
  taskDescrip: string;
  index: number;
  id: number;
  isTaskDone: boolean;
  removeTask: (id: number) => void;
  transferTask: (id: number, increaser: number) => void;
  editTask: (
    id: number,
    params: {taskName?: string; taskDescrip?: string; isTaskDone?: boolean},
  ) => void;
};

interface IEditForm {
  taskName?: string;
  taskDescrip?: string;
}
const TodoItem: FC<TodoItemProps> = memo(props => {
  const {
    taskName,
    taskDescrip,
    index,
    id,
    isTaskDone,
    removeTask,
    transferTask,
    editTask,
  } = props;
  const [isDone, setIsDone] = useState(isTaskDone);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const currentDate = new Date();
  const {register, handleSubmit} = useForm<IEditForm>();

  const calendarRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(calendarRef, () => setIsCalendarOpen(false));

  const onRemoveTask = (num: number) => {
    if (window.confirm("Are you sure?")) {
      removeTask(num);
    } else {
      window.alert("Think about removing");
    }
  };

  const onCheckTask = useCallback(
    (id: number) => {
      if (window.confirm("Is task ready?")) {
        if (isDone) {
          setIsDone(false);
          editTask(id, {isTaskDone: false});
        } else {
          setIsDone(true);
          editTask(id, {isTaskDone: true});
        }
      } else {
        setIsDone(false);
        window.alert("Think about task");
      }
    },
    [isDone],
  );

  const handleEditTask = (data: IEditForm) => {
    if (!data.taskName || !data.taskDescrip) {
      alert("Fill field");
      return;
    }
    editTask(id, {
      taskName: editFirstSymbolToUpperCase(data.taskName),
      taskDescrip: editFirstSymbolToUpperCase(data.taskDescrip),
    });
    setIsModalActive(false);
  };

  return (
    <li className={cn(styles.task, {[styles.task_done]: isTaskDone})}>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>{index}:</span>
          <span>{taskName}</span>
          <button
            onClick={() => setIsModalActive(true)}
            className={cn(styles.editBtn, {
              [styles.editBtn_disabled]: isTaskDone,
            })}
            disabled={isTaskDone}
          />
        </div>
        <p>{taskDescrip}</p>
        <form
          onSubmit={handleSubmit(handleEditTask)}
          className={cn(
            {
              [styles.invisModal]: !isModalActive,
            },
            styles.modal,
          )}
        >
          <div className={styles.windows}>
            <input
              {...register("taskName", {required: true})}
              defaultValue={props.taskName}
              disabled={!isModalActive}
            />
            <textarea
              {...register("taskDescrip", {required: true})}
              defaultValue={props.taskDescrip}
              disabled={!isModalActive}
            />
          </div>
          <div className={styles.formActive}>
            <StepBtn
              btnType="submit"
              btnText="Ok"
              isDisabled={!isModalActive}
            />
            <StepBtn
              btnText="Cancel"
              onClickStepBtn={() => setIsModalActive(false)}
              isDisabled={!isModalActive}
            />
          </div>
        </form>
      </div>

      <div className={styles.active}>
        <div className={styles.status}>
          <button
            onClick={() => onCheckTask(id)}
            className={cn(styles.statusBtn, styles.behaviorBtn, {
              [styles.success]: isTaskDone,
            })}
          />
          <button
            onClick={() => onRemoveTask(id)}
            className={cn(styles.statusBtn, styles.removeBtn)}
          >
            x
          </button>
        </div>
        <div className={styles.extraBehavior}>
          <StepBtn
            btnText="prev day"
            onClickStepBtn={() => transferTask(id, -1)}
            isDisabled={isTaskDone}
          />
          <StepBtn
            btnText="next day"
            onClickStepBtn={() => transferTask(id, 1)}
            isDisabled={isTaskDone}
          />
        </div>
        <StepBtn
          btnText="calendar"
          onClickStepBtn={() => setIsCalendarOpen(true)}
          isDisabled={isTaskDone || isCalendarOpen}
          extraClass={styles.extraBtn}
        />
        <Calendar
          value={currentDate}
          inputRef={calendarRef}
          onClickDay={date => {
            tasksStore.editTask({
              id,
              params: {
                forDate: `${date.toLocaleDateString().split(".").reverse().join("-")}`,
              },
            });
            setIsCalendarOpen(false);
          }}
          className={cn(styles.calendarBtn, {
            [styles.calendarBtn_opened]: isCalendarOpen,
          })}
        />
      </div>
    </li>
  );
});
export default TodoItem;
