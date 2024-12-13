import TodoItem from "components/TodoItem";
import {
  getFetchedTimeStamp,
  getFullSelectedDate,
  reformatSTringByLower,
} from "utils/helpers";
import {FC, useCallback, useEffect, useMemo} from "react";
import {TTasksProps} from "types/tasks";
import tasksStore from "store/tasks.ts";
import {FULL_DAY_MSECONDS} from "utils/constants.ts";
import {observer} from "mobx-react-lite";
import Loader from "components/Loader";
import styles from "./styles.module.scss";

const filterList = (
  list: TTasksProps[] | null,
  selectedDate: number,
  selectedMonth: number,
  selectedYear: number,
) => {
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
};

export const DateList: FC = observer(() => {
  const selectedDate = tasksStore.selectedDate;
  const selectedMonth = tasksStore.selectedMonth;
  const selectedYear = tasksStore.selectedYear;
  const searchValue = tasksStore.taskSearchValue;
  useEffect(() => {
    if (!tasksStore.tasksList) {
      tasksStore.fetchTasks();
    }
  }, [tasksStore.tasksList]);

  const editTask = (
    id: number,
    params: {taskName?: string; taskDescrip?: string; isTaskDone?: boolean},
  ) => {
    tasksStore.editTask({id, params});
  };

  const transferTask = useCallback(
    (id: number, increaserDate: number) => {
      if (window.confirm("Are you sure?") && increaserDate !== 0) {
        const necessaryDate = getFullSelectedDate(
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

  const removeTask = (id: number) => tasksStore.deleteTask(id);

  const filteredList = filterList(
    tasksStore.tasksList,
    selectedDate,
    selectedMonth,
    selectedYear,
  );

  const filteredListBySearch = useMemo(() => {
    return filteredList.filter(
      item =>
        reformatSTringByLower(item.taskName).includes(
          reformatSTringByLower(searchValue),
        ) ||
        reformatSTringByLower(item.taskDescrip).includes(
          reformatSTringByLower(searchValue),
        ),
    );
  }, [filteredList, searchValue]);

  const removeAllTasks = useCallback(async () => {
    const isSuccess = window.confirm("Is ok?");

    if (!isSuccess) return;

    const removePromises: Promise<unknown>[] = [];
    filteredList.forEach(item => {
      removePromises.push(new Promise(() => tasksStore.deleteTask(item.id)));
    });
    await Promise.allSettled([removePromises]);
  }, [filteredList]);

  if (tasksStore.taskListIsLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader
          loaderWidth={150}
          loaderHeight={150}
          dotWidth={15}
          dotHeight={15}
        />
      </div>
    );
  }
  return (
    <div className={styles.dateListWrapper}>
      <div className={styles.listCleanerContainer}>
        <button onClick={removeAllTasks} className={styles.listCleanerBtn}>
          Delete all
        </button>
      </div>
      <ul className={styles.dateList}>
        {filteredListBySearch.length ? (
          filteredListBySearch.map((task, index) => (
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
      </ul>
    </div>
  );
});
