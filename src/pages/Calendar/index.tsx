import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {getFetchedTimeStamp} from "utils/helpers";
import {MONTHS} from "utils/constants.ts";
import DateItem from "components/DateItem";

import tasksStore from "store/tasks.ts";
import {observer} from "mobx-react-lite";
import Loader from "components/Loader";
import styles from "./styles.module.scss";

export const Calendar: FC = observer(() => {
  const [isCreating, setIsCreating] = useState(false);
  const daysInMonth = useMemo(
    () =>
      new Date(
        tasksStore.selectedYear,
        tasksStore.selectedMonth + 1,
        0,
      ).getDate(),
    [tasksStore.selectedYear, tasksStore.selectedMonth],
  );

  const [datesAndTasks, setDatesAndTasks] = useState<
    {date: number; taskCount: number; readyCounter: number}[]
  >([]);

  // кастыль для серва
  const createCalendar = useCallback(() => {
    setIsCreating(true);
    const currentDates = [{date: 0, taskCount: 0, readyCounter: 0}];
    if (tasksStore.tasksList && tasksStore.tasksList.length) {
      for (let i = 0; i < daysInMonth; i += 1) {
        let count = 0;
        let readyCount = 0;
        for (let y = 0; y < tasksStore.tasksList.length; y += 1) {
          const nessTimeStamp = getFetchedTimeStamp(
            tasksStore.tasksList[y].forDate,
          );
          if (
            nessTimeStamp.getDate() === i + 1 &&
            tasksStore.selectedMonth === nessTimeStamp.getMonth() &&
            tasksStore.selectedYear === nessTimeStamp.getFullYear()
          ) {
            currentDates[i] = {
              ...currentDates[i],
              date: i + 1,
            };
            if (!tasksStore.tasksList[y].isTaskDone) {
              count += 1;
              currentDates[i] = {
                ...currentDates[i],
                taskCount: count,
                readyCounter: readyCount,
              };
            } else {
              readyCount += 1;
              currentDates[i] = {
                ...currentDates[i],
                taskCount: count,
                readyCounter: readyCount,
              };
            }
          } else {
            currentDates[i] = {
              date: i + 1,
              taskCount: count,
              readyCounter: readyCount,
            };
          }
        }
      }
      setTimeout(() => setIsCreating(false), 1000);
      return currentDates;
    }
    for (let i = 0; i < daysInMonth; i += 1) {
      currentDates[i] = {
        ...currentDates[i],
        date: i + 1,
        taskCount: 0,
        readyCounter: 0,
      };
    }
    setIsCreating(false);
    return currentDates;
  }, [
    tasksStore.tasksList,
    tasksStore.selectedMonth,
    tasksStore.selectedYear,
    daysInMonth,
  ]);

  useEffect(() => {
    setDatesAndTasks(createCalendar());
  }, [tasksStore.selectedMonth, tasksStore.selectedYear, tasksStore.tasksList]);

  useEffect(() => {
    tasksStore.fetchTasks();
  }, []);

  useEffect(
    () =>
      localStorage.setItem(
        "sessionStoryMonth",
        String(tasksStore.selectedMonth),
      ),
    [tasksStore.selectedMonth],
  );
  useEffect(
    () =>
      localStorage.setItem("sessionStoryYear", String(tasksStore.selectedYear)),
    [tasksStore.selectedYear],
  );
  useEffect(() => {
    if (tasksStore.selectedMonth < 0) {
      tasksStore.setSelectedMonth(11);
    }
    if (tasksStore.selectedMonth > 11) {
      tasksStore.setSelectedMonth(0);
    }
  }, [tasksStore.selectedMonth]);

  if (tasksStore.taskListIsLoading || isCreating) {
    return (
      <div className={styles.calendar}>
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
    <div className={styles.calendar}>
      <div className={styles.calendar__block}>
        <div className={styles.block__userValues}>
          <div className={styles.userValues__yearParams}>
            <button
              className={styles.arrowBtn}
              role="presentation"
              type="button"
              onClick={() => tasksStore.decrementUserYear()}
            >
              {"<"}
            </button>
            <span>{tasksStore.selectedYear}</span>
            <button
              className={styles.arrowBtn}
              role="presentation"
              type="button"
              onClick={() => tasksStore.incrementUserYear()}
            >
              {">"}
            </button>
          </div>
          <div className={styles.userValues__monthParams}>
            <button
              className={styles.arrowBtn}
              role="presentation"
              type="button"
              onClick={() => tasksStore.decrementUserMonth()}
            >
              {"<"}
            </button>
            <span className={styles.monthParams__month}>
              {MONTHS[tasksStore.selectedMonth]}
            </span>
            <button
              className={styles.arrowBtn}
              role="presentation"
              type="button"
              onClick={() => tasksStore.incrementUserMonth()}
            >
              {">"}
            </button>
          </div>
        </div>
        <div className={styles.block__container}>
          <div className={styles.block__dates}>
            {datesAndTasks.map(item => (
              <DateItem key={item.date} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
