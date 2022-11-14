import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MONTHS} from "constances/constances";
import "./styles.scss";
import {selectUserMonth, selectUserYear} from "store/selectors";
import {getFetchedTimeStamp} from "helpers/helpers";
import {checkUserMonth, checkUserYear, fetchTaskBase} from "store/date/actions";
import {selectFetchedTaskBase} from "store/date/selectors";
import {AppDispatch} from "store/types";
import DateItem from "../../components/DateItem/DateItem";

type FetchInfoType = {
  taskName: string;
  taskDescrip: string;
  id: number;
  forDate: string;
  isTaskDone: boolean;
}[];

function Calendar() {
  const dispatch = useDispatch<AppDispatch>();
  const userMonth = useSelector(selectUserMonth);
  const userYear = useSelector(selectUserYear);

  const [today] = useState(new Date());
  const fetchedTaskList = useSelector(selectFetchedTaskBase);
  const [currentMonth, setCurrentMonth] = useState(
    userMonth || today.getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    userYear || today.getFullYear(),
  );
  const [isLostYear, setIsLostYear] = useState(false);
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(currentYear, currentMonth + 1, 0).getDate(),
  );
  const [fetchedInfo, setFetchedInfo] =
    useState<FetchInfoType>(fetchedTaskList);

  // кастыль для серва
  const currentDates = [{date: 0, taskCount: 0, readyCounter: 0}];

  if (fetchedInfo) {
    for (let i = 0; i < daysInMonth; i += 1) {
      let count = 0;
      let readyCount = 0;
      for (let y = 0; y < fetchedInfo.length; y += 1) {
        if (
          getFetchedTimeStamp(fetchedInfo[y].forDate).getDate() === i + 1 &&
          currentMonth ===
            getFetchedTimeStamp(fetchedInfo[y].forDate).getMonth() &&
          currentYear ===
            getFetchedTimeStamp(fetchedInfo[y].forDate).getFullYear()
        ) {
          currentDates[i] = {
            ...currentDates[i],
            date: i + 1,
          };
          if (!fetchedInfo[y].isTaskDone) {
            count += 1;
            currentDates[i] = {
              ...currentDates[i],
              date: i + 1,
              taskCount: count,
              readyCounter: readyCount,
            };
          } else {
            readyCount += 1;
            currentDates[i] = {
              ...currentDates[i],
              date: i + 1,
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
  }
  // TODO: review ALL FILE!!!

  const changeYear = (e: any) => {
    const betweens = e.target.textContent === "<" ? -1 : 1;
    setCurrentYear(currentYear + betweens);
  };

  const changeMonth = (e: any) => {
    const betweens = e.target.textContent === "<" ? -1 : 1;
    setCurrentMonth(currentMonth + betweens);
  };

  useEffect(() => {
    setFetchedInfo(fetchedTaskList);
  }, [fetchedTaskList]);
  useEffect(() => {
    if (currentMonth < 0) {
      setCurrentMonth(11);
    }
    if (currentMonth > 11) {
      setCurrentMonth(0);
    }
    if (currentYear - 1 < today.getFullYear()) {
      setIsLostYear(true);
    } else {
      setIsLostYear(false);
    }
    setDaysInMonth(new Date(currentYear, currentMonth + 1, 0).getDate());
    localStorage.setItem("sessionStoryMonth", String(currentMonth));
    localStorage.setItem("sessionStoryYear", String(currentYear));
    dispatch(checkUserMonth(currentMonth));
    dispatch(checkUserYear(currentYear));
    dispatch(fetchTaskBase());
  }, [currentMonth, currentYear]);

  return (
    <div className="calendar">
      <div className="calendar__block">
        <div className="block__userValues">
          <div className="userValues__yearParams">
            <span
              role="presentation"
              className={isLostYear ? " hidden" : ""}
              onClick={changeYear}
            >
              {"<"}
            </span>
            <span>{currentYear}</span>
            <span role="presentation" onClick={changeYear}>
              {">"}
            </span>
          </div>
          <div className="userValues__monthParams">
            <span role="presentation" onClick={changeMonth}>
              {"<"}
            </span>
            <span className="monthParams__month">{MONTHS[currentMonth]}</span>
            <span role="presentation" onClick={changeMonth}>
              {">"}
            </span>
          </div>
        </div>
        <div className="block__container">
          <div className="block__dates">
            {currentDates.map(item => (
              <DateItem
                key={item.date}
                date={item.date}
                taskCount={item.taskCount}
                readyCount={item.readyCounter}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
