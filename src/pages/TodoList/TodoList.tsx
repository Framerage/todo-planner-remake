import React, {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./styles.scss";
import {months, pathsBack, weekDays} from "constances/constances";
import TodoItem from "components/TodoItem/TodoItem";
import axios from "axios";
import {
  getFetchedTimeStamp,
  getFullChoosedDate,
  someDelay,
} from "helpers/helpers";
import {selectUserDate, selectUserMonth, selectUserYear} from "store/selectors";
import getApi from "api/api";
import {deleteChoosedTask, editChoosedTask} from "store/date/actions";
import store from "store/store";

type TasksType = {
  taskName: string;
  taskDescrip: string;
  isTaskDone: boolean;
  id: number;
  forDate: string;
}[];
const fullDayMseconds = 24 * 60 * 60 * 1000;
type AppDispatch = typeof store.dispatch;
function TodoList() {
  const choosedDate =
    useSelector(selectUserDate) || Number(localStorage.sessionStoryDate);
  const choosedMonth =
    useSelector(selectUserMonth) || Number(localStorage.sessionStoryMonth);
  const choosedYear =
    useSelector(selectUserYear) || Number(localStorage.sessionStoryYear);
  const [aWeekDay, setAweekDay] = useState("");
  const [taskList, setTaskList] = useState<TasksType>([]);
  const [isTaskListReady, setIsTaskListReadty] = useState(false);
  const fullDate = getFullChoosedDate(
    choosedYear,
    choosedMonth,
    choosedDate,
    0,
  );
  const [inputNameTask, setInputNameTask] = useState("");
  const [inputDescriptionTask, setInputDescriptionTask] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const createNewTask = useCallback(
    async (date: string, task: {name: string; description: string}) => {
      if (inputNameTask && inputDescriptionTask) {
        try {
          const obj = {
            taskName: task.name,
            taskDescrip: task.description,
            forDate: date,
            isTaskDone: false,
          };
          setTaskList(prev => [
            ...prev,
            {
              taskName: task.name,
              taskDescrip: task.description,
              id: 0,
              forDate: date,
              isTaskDone: false,
            },
          ]);
          const {data} = await axios.post(getApi(pathsBack.taskBase), obj);
          setTaskList(prev =>
            prev.map(item => {
              if (item.taskDescrip === data.taskDescrip) {
                return {
                  ...item,
                  id: data.id,
                };
              }
              return item;
            }),
          );
        } catch (e) {
          return e;
        }
        setInputNameTask("");
        setInputDescriptionTask("");
        return true;
      }
      window.alert("Fill all fields");
      return false;
    },
    [inputNameTask, inputDescriptionTask],
  );

  useEffect(() => {
    const fetchTaskList = async () => {
      await axios.get(getApi(pathsBack.taskBase)).then(({data}) => {
        data.map(
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
            return data;
          },
        );
      });
    };
    if (!isTaskListReady && taskList.length === 0) {
      fetchTaskList();
      setAweekDay(weekDays[getFetchedTimeStamp(fullDate).getDay()]);
      setIsTaskListReadty(true);
    } else {
      setIsTaskListReadty(false);
    }
  }, []);

  const removeTask = useCallback(async (id: number) => {
    dispatch(deleteChoosedTask({id}));
    setTaskList(taskList.filter(el => el.id !== id));
  }, []);

  const transferTask = useCallback(
    async (id: number, increaserDate: number) => {
      if (window.confirm("Are you sure?")) {
        const nessesaryDate = getFullChoosedDate(
          choosedYear,
          choosedMonth,
          choosedDate,
          fullDayMseconds * increaserDate,
        );
        dispatch(editChoosedTask({id, param: {forDate: `${nessesaryDate}`}}));
        await someDelay(1000);
        setTaskList(taskList.filter(el => el.id !== id));
      } else {
        window.alert("Ok,think about it");
      }
    },
    [choosedYear, choosedMonth, choosedDate],
  );

  return (
    <div className="todoList">
      <div className="todoList__block">
        <div className="block__creator">
          <input
            value={inputNameTask}
            onChange={e => setInputNameTask(e.target.value)}
            type="text"
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
                description:
                  inputDescriptionTask[0].toUpperCase() +
                  inputDescriptionTask.slice(1),
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
            {taskList.length !== 0 ? (
              taskList.map((task, index) => (
                <TodoItem
                  key={task.taskName + task.id}
                  {...task}
                  index={index + 1}
                  removeTask={removeTask}
                  transferTask={transferTask}
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
