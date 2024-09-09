import {useState, useEffect, useCallback, FC, useMemo} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {
//   FULL_DAY_MSECONDS,
//   MONTHS,
//   WEEK_DAYS,
// } from "utils/constances/constances";
// import TodoItem from "components/TodoItem/TodoItem";
// import {
//   editFirstSymbolToUpperCase,
//   getFetchedTimeStamp,
//   getFullChoosedDate,
//   someDelay,
// } from "utils/helpers/helpers";
// import {
//   deleteChoosedTask,
//   editChoosedTask,
//   fetchTaskBase,
//   postNewTask,
// } from "store/date/actions";
// import {
//   selectFetchedTaskBase,
//   selectPostedTask,
//   selectUserDate,
//   selectUserMonth,
//   selectUserYear,
// } from "store/date/selectors";
// import {AppDispatch} from "store/types";
// import {DateStateProps} from "store/date/types";
import {TTasksProps} from "types/tasks";
import {
  editFirstSymbolToUpperCase,
  getFetchedTimeStamp,
  getFullChoosedDate,
  someDelay,
} from "utils/helpers";
import {FULL_DAY_MSECONDS, MONTHS, WEEK_DAYS} from "utils/constants.ts";
import {DateStateProps} from "types/dates";
import TodoItem from "components/TodoItem";
import cn from "classnames";
import tasksStore from "store/tasks.ts";
import {useForm} from "react-hook-form";
import {useComputed} from "hooks/useComputed";
import {observer} from "mobx-react-lite";
import styles from "./styles.module.scss";
// import {TasksProps} from "types/appTypes";

const ItemTodos: FC = observer(() => {
  //   const dispatch = useDispatch<AppDispatch>();
  //   const newTask = useSelector(selectPostedTask);
  //   const fetchedTasks = useSelector(selectFetchedTaskBase);
  const selectedDate = tasksStore.selectedDate;
  const selectedMonth = tasksStore.selectedMonth;
  const selectedYear = tasksStore.selectedYear;
  // const {selectedYear, selectedMonth, selectedDate} = tasksStore;
  const [aWeekDay, setAweekDay] = useState("");
  const [isTaskListReady, setIsTaskListReadty] = useState(false);
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
    (id: number, params: {}) => {
      //   dispatch(editChoosedTask({id, param: params})).then(() => {
      //     setTaskList(prev =>
      //       prev.map(item => {
      //         if (item.id === id) {
      //           return {
      //             ...item,
      //             ...params,
      //           };
      //         }
      //         return item;
      //       }),
      //     );
      //   });
      someDelay(1000);
    },
    [tasksStore.tasksList],
  );

  const removeTask = useCallback(
    (id: number) => tasksStore.deleteTask(id),
    [tasksStore.tasksList],
  );
  // all ok
  const transferTask = useCallback(
    (id: number, increaserDate: number) => {
      if (window.confirm("Are you sure?") && increaserDate !== 0) {
        const nessesaryDate = getFullChoosedDate(
          selectedYear,
          selectedMonth,
          selectedDate,
          FULL_DAY_MSECONDS * increaserDate,
        );
        // dispatch(
        //   editChoosedTask({id, param: {forDate: `${nessesaryDate}`}}),
        // ).then(() => {
        //   setTaskList(taskList.filter(el => el.id !== id));
        // });
      } else {
        window.alert("Ok,think about it");
      }
    },
    [selectedYear, selectedMonth, selectedDate, tasksStore.tasksList],
  );

  const removeAllTasks = useCallback(() => {
    tasksStore.tasksList &&
      tasksStore.tasksList.forEach(item => {
        //   dispatch(deleteChoosedTask(item.id)).then(() => {
        //     someDelay(1500);
        //   });
      });
    // setTaskList([]);
  }, [tasksStore.tasksList]);
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
  const currentTaskList = useMemo(() => {
    if (!tasksStore.tasksList) {
      return [];
    }
    return tasksStore.tasksList.filter(el => {
      const curTimeStamp = getFetchedTimeStamp(el.forDate);
      return (
        selectedDate === curTimeStamp.getDate() &&
        selectedMonth === curTimeStamp.getMonth() &&
        selectedYear === curTimeStamp.getFullYear()
      );
    });
  }, [tasksStore.tasksList, selectedDate, selectedMonth, selectedYear]);
  return (
    <div className={styles.todoList}>
      <div className={styles.todoList__block}>
        <button
          onClick={removeAllTasks}
          className={cn(styles.block__generalDelete, {
            [styles.emptyTaskList]:
              tasksStore.tasksList && !!tasksStore.tasksList.length,
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
            {currentTaskList.length ? (
              currentTaskList.map((task, index) => (
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
