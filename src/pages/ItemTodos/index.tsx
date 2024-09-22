import {useState, useEffect, useCallback, FC, useMemo} from "react";
import {TTasksProps} from "types/tasks";
import {
  editFirstSymbolToUpperCase,
  getFetchedTimeStamp,
  getFullChoosedDate,
} from "utils/helpers";
import {FULL_DAY_MSECONDS, MONTHS, WEEK_DAYS} from "utils/constants.ts";
import TodoItem from "components/TodoItem";
import cn from "classnames";
import tasksStore from "store/tasks.ts";
import {useForm} from "react-hook-form";
import {observer} from "mobx-react-lite";
import styles from "./styles.module.scss";

const ItemTodos: FC = observer(() => {
  const selectedDate = tasksStore.selectedDate;
  const selectedMonth = tasksStore.selectedMonth;
  const selectedYear = tasksStore.selectedYear;
  const [aWeekDay, setAweekDay] = useState("");
  const fullDate = useMemo(
    () => getFullChoosedDate(selectedYear, selectedMonth, selectedDate, 0),
    [selectedYear, selectedMonth, selectedDate],
  );

  useEffect(() => {
    if (!tasksStore.tasksList) {
      tasksStore.fetchTasks();
    }
  }, [tasksStore.tasksList]);

  useEffect(() => {
    setAweekDay(WEEK_DAYS[getFetchedTimeStamp(fullDate).getDay()]);
  }, []);

  const editTask = useCallback(
    (id: number, params: {taskName?: string; taskDescrip?: string}) => {
      tasksStore.editTask({id, params});
    },
    [tasksStore],
  );

  const transferTask = useCallback(
    (id: number, increaserDate: number) => {
      if (window.confirm("Are you sure?") && increaserDate !== 0) {
        const necessaryDate = getFullChoosedDate(
          selectedYear,
          selectedMonth,
          selectedDate,
          FULL_DAY_MSECONDS * increaserDate,
        );
        tasksStore.editTask({id, params: {forDate: `${necessaryDate}`}});
      } else {
        window.alert("Ok,think about it");
      }
    },
    [selectedYear, selectedMonth, selectedDate, editTask],
  );

  interface ITaskItem {
    taskName: string;
    taskDescription: string;
  }
  const {register, handleSubmit, setValue, setFocus} = useForm<ITaskItem>();

  const handleCreateTask = useCallback(
    (data: {taskName: string; taskDescription: string}) => {
      if (!data.taskName || !data.taskDescription) {
        alert("Заполните все поля");
        return;
      }
      const obj = {
        id: Math.random().toFixed(2),
        taskName: editFirstSymbolToUpperCase(data.taskName),
        taskDescrip: editFirstSymbolToUpperCase(data.taskDescription),
        forDate: fullDate,
        isTaskDone: false,
      };
      tasksStore.postNewTask(obj);
      setValue("taskName", "");
      setValue("taskDescription", "");
      setFocus("taskName");
    },
    [fullDate],
  );

  const filterList = useCallback(
    (list: TTasksProps[] | null) => {
      if (!list) {
        return [];
      }
      return list.filter(el => {
        const curTimeStamp = getFetchedTimeStamp(el.forDate);
        return (
          selectedDate === curTimeStamp.getDate() &&
          selectedMonth === curTimeStamp.getMonth() &&
          selectedYear === curTimeStamp.getFullYear()
        );
      });
    },
    [selectedDate, selectedMonth, selectedYear],
  );
  const filteredList = filterList(tasksStore.tasksList);

  const removeTask = useCallback(
    (id: number) => tasksStore.deleteTask(id),
    [tasksStore.tasksList],
  );

  const removeAllTasks = useCallback(async () => {
    const removePromises: Promise<unknown>[] = [];
    filteredList.forEach(item => {
      removePromises.push(new Promise(() => removeTask(item.id)));
    });
    await Promise.allSettled([removePromises]);
  }, [filteredList, removeTask]);

  return (
    <div className={styles.todoList}>
      <div className={styles.todoList__block}>
        <button
          onClick={removeAllTasks}
          className={cn(styles.block__generalDelete, {
            [styles.emptyTaskList]: !filteredList.length,
          })}
          type="button"
        >
          Delete all tasks
        </button>
        <form
          className={styles.taskForm}
          onSubmit={handleSubmit(handleCreateTask)}
        >
          <input
            id="taskNameField"
            {...register("taskName", {required: true})}
            placeholder="name of task"
            className={styles.taskForm__field}
          />

          <input
            {...register("taskDescription", {required: true})}
            placeholder="description of task"
            className={styles.taskForm__field}
          />
          <button className={styles.taskForm__btn}>Create task</button>
        </form>
        <div className={styles.block__listContainer}>
          <h2>
            Tasklist of {selectedDate} {MONTHS[selectedMonth]} {selectedYear} (
            {aWeekDay})
          </h2>
          <div className={styles.listContainer__list}>
            {filteredList.length ? (
              filteredList.map((task, index) => (
                <TodoItem
                  key={task.taskName + task.id}
                  {...task}
                  index={index + 1}
                  removeTask={removeTask}
                  transferTask={transferTask}
                  editTask={editTask}
                />
              ))
            ) : (
              <h2>Empty</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
export default ItemTodos;
