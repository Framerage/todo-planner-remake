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
import styles from "./styles.module.scss";
// import {TasksProps} from "types/appTypes";

const ItemTodos: FC = () => {
  //   const dispatch = useDispatch<AppDispatch>();
  //   const newTask = useSelector(selectPostedTask);
  //   const fetchedTasks = useSelector(selectFetchedTaskBase);
  const fetchedTasks: any[] = [];
  const choosedDate = tasksStore.selectedDate;
  const choosedMonth = tasksStore.selectedMonth;
  const choosedYear = tasksStore.selectedYear;
  const [aWeekDay, setAweekDay] = useState("");
  // const [taskList, setTaskList] = useState<DateStateProps["postedTask"][]>([]);
  const [isTaskListReady, setIsTaskListReadty] = useState(false);
  const fullDate = useMemo(
    () => getFullChoosedDate(choosedYear, choosedMonth, choosedDate, 0),
    [choosedYear, choosedMonth, choosedDate],
  );
  const [isNewTaken, setNewIdTaken] = useState(false);
  const [inputNameTask, setInputNameTask] = useState("");
  const [inputDescriptionTask, setInputDescriptionTask] = useState("");

  const createNewTask = useCallback(
    (date: string, task: {name: string; description: string}) => {
      const condition = task.name && task.description;
      if (!condition) {
        window.alert("Fill all fields");
      } else {
        const obj = {
          taskName: task.name,
          taskDescrip: task.description,
          forDate: date,
          isTaskDone: false,
        };
        // тип any потому что хз что подставлять, на TasksProps ругается
        // dispatch(postNewTask(obj)).then(({payload}: any) =>
        //   PayloadAction<
        //     DateStateProps,
        //     string,
        //     {
        //       arg: {
        //         obj: {
        //           taskName: string;
        //           taskDescrip: string;
        //           isTaskDone: boolean;
        //           forDate: string;
        //         };
        //       };
        //       requestId: string;
        //       requestStatus: "fulfilled";
        //     },
        //     never
        //   >
        // here was empty
        //   {
        //     setTaskList(prev => [...prev, payload]);
        //   },
        // );
        setInputNameTask("");
        setInputDescriptionTask("");
      }
    },
    [tasksStore.tasksList],
  );
  // all ok
  //   useEffect(() => {
  //     if (isNewTaken) {
  //       setNewIdTaken(false);
  //     } else {
  //       setTaskList(prev =>
  //         prev.map(item => {
  //           if (item.taskDescrip === newTask.taskDescrip) {
  //             return {
  //               ...item,
  //               id: newTask.id,
  //             };
  //           }
  //           return item;
  //         }),
  //       );
  //       setNewIdTaken(true);
  //     }
  //   }, [newTask]);

  // rerender , all ok
  //   useEffect(() => {
  //     dispatch(fetchTaskBase());
  //   }, []);
  // all ok
  // useEffect(() => {
  //   if (!isTaskListReady && taskList.length === 0) {
  //     fetchedTasks.map((el: TTasksProps) => {
  //       const curTimeStamp = getFetchedTimeStamp(el.forDate);
  //       if (
  //         choosedDate === curTimeStamp.getDate() &&
  //         choosedMonth === curTimeStamp.getMonth() &&
  //         choosedYear === curTimeStamp.getFullYear()
  //       ) {
  //         setTaskList(prev => [...prev, el]);
  //       }
  //       return fetchedTasks;
  //     });
  //     setAweekDay(WEEK_DAYS[getFetchedTimeStamp(fullDate).getDay()]);
  //     setIsTaskListReadty(true);
  //   } else {
  //     setIsTaskListReadty(false);
  //   }
  // }, [fetchedTasks]);
  // all ok
  const dayTaskList = useMemo(() => {
    // const result = tasksStore.tasksList.filter(el => {
    //   const curTimeStamp = getFetchedTimeStamp(el.forDate);
    //   return (
    //     choosedDate === curTimeStamp.getDate() &&
    //     choosedMonth === curTimeStamp.getMonth() &&
    //     choosedYear === curTimeStamp.getFullYear()
    //   );
    // });
    // return result;
    return tasksStore.tasksList;
  }, [choosedYear, choosedMonth, choosedDate, tasksStore]);

  // const dayTaskList = useComputed(() => tasksStore.tasksList);

  // console.log(tasksStore.tasksList.length, "tasksStore.tasksList", dayTaskList);

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
  // all ok
  const removeTask = useCallback(
    (id: number) => {
      //   dispatch(deleteChoosedTask(id)).then(() => {
      //     setTaskList(taskList.filter(el => el.id !== id));
      //   });
    },
    [tasksStore.tasksList],
  );
  // all ok
  const transferTask = useCallback(
    (id: number, increaserDate: number) => {
      if (window.confirm("Are you sure?") && increaserDate !== 0) {
        const nessesaryDate = getFullChoosedDate(
          choosedYear,
          choosedMonth,
          choosedDate,
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
    [choosedYear, choosedMonth, choosedDate, tasksStore.tasksList],
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
  const {register, handleSubmit, setValue} = useForm<ITaskItem>();

  const handleCreateTask = useCallback(
    (data: {taskName: string; taskDescription: string}) => {
      // authStore.fetchAuth({userName: data.userName, userPass: data.userPass});
      if (!data.taskName || !data.taskDescription) {
        alert("Заполните все поля");
        return;
      }
      console.log(data, " task data");
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
    },
    [fullDate],
  );
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
          <label htmlFor="taskNameField">
            <input
              id="taskNameField"
              {...register("taskName", {required: true})}
              placeholder="name of task"
              className={styles.taskForm__field}
            />
          </label>

          <input
            {...register("taskDescription", {required: true})}
            placeholder="description of task"
            className={styles.taskForm__field}
          />
          <button className={styles.taskForm__btn}>Create task</button>
        </form>
        <div className={styles.block__listContainer}>
          <div className={styles.listContainer__list}>
            <h2>
              Tasklist of {choosedDate} {MONTHS[choosedMonth]} {choosedYear} (
              {aWeekDay})
            </h2>
            {tasksStore.tasksList && tasksStore.tasksList.length ? (
              tasksStore.tasksList.map((task, index) => (
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
};
export default ItemTodos;
