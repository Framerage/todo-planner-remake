import React, {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./styles.scss";
import {months, weekDays} from "constances/constances";
import TodoItem from "components/TodoItem/TodoItem";
import {
  getFetchedTimeStamp,
  getFullChoosedDate,
  someDelay,
} from "helpers/helpers";
import {selectUserDate, selectUserMonth, selectUserYear} from "store/selectors";
import {
  deleteChoosedTask,
  editChoosedTask,
  fetchTaskBase,
  postNewTask,
} from "store/date/actions";
import {selectFetchedTaskBase, selectPostedTask} from "store/date/selectors";
import {AppDispatch} from "store/types";
// import {DateStateProps} from "store/date/types";

type TasksType = {
  taskName: string;
  taskDescrip: string;
  isTaskDone: boolean;
  id: number;
  forDate: string;
}[];
const fullDayMseconds = 24 * 60 * 60 * 1000;
function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const newTask = useSelector(selectPostedTask);
  const fetchedTasks = useSelector(selectFetchedTaskBase);
  const choosedDate = useSelector(selectUserDate);
  const choosedMonth = useSelector(selectUserMonth);
  const choosedYear = useSelector(selectUserYear);
  const [aWeekDay, setAweekDay] = useState("");
  const [taskList, setTaskList] = useState<TasksType>([]);
  const [isTaskListReady, setIsTaskListReadty] = useState(false);
  const fullDate = getFullChoosedDate(
    choosedYear,
    choosedMonth,
    choosedDate,
    0,
  );
  const [isIdToken, setIsIdToken] = useState(false);
  const [inputNameTask, setInputNameTask] = useState("");
  const [inputDescriptionTask, setInputDescriptionTask] = useState("");

  const createNewTask = (
    date: string,
    task: {name: string; description: string},
  ) => {
    const condition = inputNameTask && inputDescriptionTask;
    if (!condition) {
      window.alert("Fill all fields");
    } else {
      const obj = {
        taskName: task.name,
        taskDescrip: task.description,
        forDate: date,
        isTaskDone: false,
      };
      // тип any потому что хз что подставлять, на tasksType ругается
      dispatch(postNewTask({obj})).then(({payload}: any) => {
        if (payload) {
          console.log(payload, " action create");
          setTaskList(prev => [...prev, payload]);
        }
      });
      setInputNameTask("");
      setInputDescriptionTask("");
    }
  };
  useEffect(() => {
    if (isIdToken) {
      setIsIdToken(false);
    } else {
      setTaskList(prev =>
        prev.map(item => {
          if (item.taskDescrip === newTask.taskDescrip) {
            console.log(newTask.taskDescrip, " newTask.taskDescrip");
            console.log(item.taskDescrip, " item.taskDescrip");

            return {
              ...item,
              id: newTask.id,
            };
          }
          return item;
        }),
      );
      setIsIdToken(true);
    }
  }, [newTask]);

  // rerender
  useEffect(() => {
    // if (taskList.length === 0) {
    //   dispatch(fetchTaskBase());
    // } else {
    //   fetchedTasks.map(
    //     (el: {
    //       taskName: string;
    //       taskDescrip: string;
    //       id: number;
    //       forDate: string;
    //       isTaskDone: boolean;
    //     }) => {
    //       if (
    //         choosedDate === getFetchedTimeStamp(el.forDate).getDate() &&
    //         choosedMonth === getFetchedTimeStamp(el.forDate).getMonth() &&
    //         choosedYear === getFetchedTimeStamp(el.forDate).getFullYear()
    //       ) {
    //         setTaskList(prev => [...prev, el]);
    //       }
    //       return fetchedTasks;
    //     },
    //   );
    // }
    console.log("rerender done");
    dispatch(fetchTaskBase());
  }, []);

  useEffect(() => {
    if (!isTaskListReady && taskList.length === 0) {
      fetchedTasks.map(
        (el: {
          taskName: string;
          taskDescrip: string;
          id: number;
          forDate: string;
          isTaskDone: boolean;
        }) => {
          if (
            choosedDate === getFetchedTimeStamp(el.forDate).getDate() &&
            choosedMonth === getFetchedTimeStamp(el.forDate).getMonth() &&
            choosedYear === getFetchedTimeStamp(el.forDate).getFullYear()
          ) {
            setTaskList(prev => [...prev, el]);
          }
          return fetchedTasks;
        },
      );
      setAweekDay(weekDays[getFetchedTimeStamp(fullDate).getDay()]);
      setIsTaskListReadty(true);
    } else {
      setIsTaskListReadty(false);
    }
  }, [fetchedTasks]);

  const editTask = useCallback(async (id: number, isDone: boolean) => {
    dispatch(editChoosedTask({id, param: {isTaskDone: `${isDone}`}})).then(
      action => {
        console.log(action, "action info");
        setTaskList(prev =>
          prev.map(item => {
            console.log(item.id === id, "from edit");
            if (item.id === id) {
              return {
                ...item,
                isTaskDone: isDone,
              };
            }
            return item;
          }),
        );
      },
    );
    await someDelay(1000);
  }, []);

  const removeTask = useCallback(
    (id: number) => {
      dispatch(deleteChoosedTask({id})).then(() => {
        setTaskList(taskList.filter(el => el.id !== id));
      });
    },
    [taskList],
  );

  console.log(taskList, " taskList");
  const transferTask = useCallback(
    (id: number, increaserDate: number) => {
      if (window.confirm("Are you sure?") && increaserDate !== 0) {
        const nessesaryDate = getFullChoosedDate(
          choosedYear,
          choosedMonth,
          choosedDate,
          fullDayMseconds * increaserDate,
        );
        dispatch(
          editChoosedTask({id, param: {forDate: `${nessesaryDate}`}}),
        ).then(() => {
          setTaskList(taskList.filter(el => el.id !== id));
        });
      } else {
        window.alert("Ok,think about it");
      }
    },
    [choosedYear, choosedMonth, choosedDate, taskList],
  );

  return (
    <div className="todoList">
      <div className="todoList__block">
        <div className="block__creator">
          <input
            value={inputNameTask}
            onChange={e => setInputNameTask(e.target.value)}
            placeholder="name of task"
          />
          <input
            value={inputDescriptionTask}
            onChange={e => setInputDescriptionTask(e.target.value)}
            type="text"
            placeholder="description of task"
          />
          <button
            type="button"
            onClick={() =>
              createNewTask(fullDate, {
                name: inputNameTask[0].toUpperCase() + inputNameTask.slice(1),
                description: inputDescriptionTask
                  ? inputDescriptionTask[0].toUpperCase() +
                    inputDescriptionTask.slice(1)
                  : inputDescriptionTask,
              })
            }
          >
            Create task
          </button>
        </div>
        <div className="block__listContainer">
          <div className="listContainer__list">
            <h2>
              Tasklist of {choosedDate} {months[choosedMonth]} {choosedYear} (
              {aWeekDay})
            </h2>
            {taskList.length ? (
              taskList.map((task, index) => (
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
}
export default TodoList;
