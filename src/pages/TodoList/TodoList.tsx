import React, {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./styles.scss";
import {FULL_DAY_MSECONDS, MONTHS, WEEK_DAYS} from "constances/constances";
import TodoItem from "components/TodoItem/TodoItem";
import {
  editFirstSymbolToUpperCase,
  getFetchedTimeStamp,
  getFullChoosedDate,
  someDelay,
} from "helpers/helpers";
import {
  deleteChoosedTask,
  editChoosedTask,
  fetchTaskBase,
  postNewTask,
} from "store/date/actions";
import {
  selectFetchedTaskBase,
  selectPostedTask,
  selectUserDate,
  selectUserMonth,
  selectUserYear,
} from "store/date/selectors";
import {AppDispatch} from "store/types";
import {DateStateProps} from "store/date/types";
import {TasksProps} from "types/appTypes";

function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const newTask = useSelector(selectPostedTask);
  const fetchedTasks = useSelector(selectFetchedTaskBase);
  const choosedDate = useSelector(selectUserDate);
  const choosedMonth = useSelector(selectUserMonth);
  const choosedYear = useSelector(selectUserYear);
  const [aWeekDay, setAweekDay] = useState("");
  const [taskList, setTaskList] = useState<DateStateProps["postedTask"][]>([]);
  const [isTaskListReady, setIsTaskListReadty] = useState(false);
  const fullDate = getFullChoosedDate(
    choosedYear,
    choosedMonth,
    choosedDate,
    0,
  );
  const [isIdTaken, setIsIdTaken] = useState(false);
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
        // тип any потому что хз что подставлять, на tasksType ругается
        dispatch(postNewTask(obj)).then(({payload}: any) =>
          // PayloadAction<
          //   DateStateProps,
          //   string,
          //   {
          //     arg: {
          //       obj: {
          //         taskName: string;
          //         taskDescrip: string;
          //         isTaskDone: boolean;
          //         forDate: string;
          //       };
          //     };
          //     requestId: string;
          //     requestStatus: "fulfilled";
          //   },
          //   never
          // >
          {
            setTaskList(prev => [...prev, payload]);

            // if (payload) {
            //   setTaskList(prev => [...prev, payload]);
            // }
          },
        );
        setInputNameTask("");
        setInputDescriptionTask("");
      }
    },
    [taskList],
  );
  // all ok
  useEffect(() => {
    if (isIdTaken) {
      setIsIdTaken(false);
    } else {
      setTaskList(prev =>
        prev.map(item => {
          if (item.taskDescrip === newTask.taskDescrip) {
            return {
              ...item,
              id: newTask.id,
            };
          }
          return item;
        }),
      );
      setIsIdTaken(true);
    }
  }, [newTask]);

  // rerender , all ok
  useEffect(() => {
    dispatch(fetchTaskBase());
  }, []);
  // all ok
  useEffect(() => {
    if (!isTaskListReady && taskList.length === 0) {
      fetchedTasks.map((el: TasksProps) => {
        const curTimeStamp = getFetchedTimeStamp(el.forDate);
        if (
          choosedDate === curTimeStamp.getDate() &&
          choosedMonth === curTimeStamp.getMonth() &&
          choosedYear === curTimeStamp.getFullYear()
        ) {
          setTaskList(prev => [...prev, el]);
        }
        return fetchedTasks;
      });
      setAweekDay(WEEK_DAYS[getFetchedTimeStamp(fullDate).getDay()]);
      setIsTaskListReadty(true);
    } else {
      setIsTaskListReadty(false);
    }
  }, [fetchedTasks]);
  // all ok
  const editTask = useCallback(
    (id: number, isDone: boolean) => {
      dispatch(editChoosedTask({id, param: {isTaskDone: isDone}})).then(() => {
        setTaskList(prev =>
          prev.map(item => {
            if (item.id === id) {
              return {
                ...item,
                isTaskDone: isDone,
              };
            }
            return item;
          }),
        );
      });
      someDelay(1000);
    },
    [taskList],
  );
  // all ok
  const removeTask = useCallback(
    (id: number) => {
      dispatch(deleteChoosedTask(id)).then(() => {
        setTaskList(taskList.filter(el => el.id !== id));
      });
    },
    [taskList],
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
            placeholder="description of task"
          />
          <button
            type="button"
            onClick={() =>
              createNewTask(fullDate, {
                name: editFirstSymbolToUpperCase(inputNameTask),
                description: editFirstSymbolToUpperCase(inputDescriptionTask),
              })
            }
          >
            Create task
          </button>
        </div>
        <div className="block__listContainer">
          <div className="listContainer__list">
            <h2>
              Tasklist of {choosedDate} {MONTHS[choosedMonth]} {choosedYear} (
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
