import {FC, useCallback, useEffect, useMemo, useState} from "react";
import styles from "./styles.module.scss";
import {getFetchedTimeStamp} from "utils/helpers";
import {MONTHS} from "utils/constants.ts";
import DateItem from "components/DateItem";

import tasksStore from "store/tasks.ts";
import {observer} from "mobx-react-lite";

export const Calendar: FC = observer(() => {
  const daysInMonth = useMemo(
    () => new Date(tasksStore.userYear, tasksStore.userMonth + 1, 0).getDate(),
    [tasksStore.userYear, tasksStore.userMonth],
  );

  const [datesAndTasks, setDatesAndTasks] = useState<
    {date: number; taskCount: number; readyCounter: number}[]
  >([]);

  // кастыль для серва
  const createCalendar = useCallback(() => {
    let currentDates = [{date: 0, taskCount: 0, readyCounter: 0}];
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
            tasksStore.userMonth === nessTimeStamp.getMonth() &&
            tasksStore.userYear === nessTimeStamp.getFullYear()
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

    return currentDates;
  }, [tasksStore.tasksList, tasksStore.userMonth, tasksStore.userYear]);

  useEffect(() => {
    setDatesAndTasks(createCalendar());
  }, [tasksStore.userMonth, tasksStore.userYear]);

  useEffect(() => {
    tasksStore.fetchTasks();
  }, []);

  useEffect(
    () =>
      localStorage.setItem("sessionStoryMonth", String(tasksStore.userMonth)),
    [tasksStore.userMonth],
  );
  useEffect(
    () => localStorage.setItem("sessionStoryYear", String(tasksStore.userYear)),
    [tasksStore.userYear],
  );
  useEffect(() => {
    if (tasksStore.userMonth < 0) {
      tasksStore.setUserMonth(11);
    }
    if (tasksStore.userMonth > 11) {
      tasksStore.setUserMonth(0);
    }
  }, [tasksStore.userMonth]);

  console.log("render calendar");
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
            <span>{tasksStore.userYear}</span>
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
              {MONTHS[tasksStore.userMonth]}
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