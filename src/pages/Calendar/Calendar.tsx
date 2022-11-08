import React, { useCallback, useEffect, useState } from "react";
import { checkChoosedMonth, checkChoosedYear } from "store/actions/dateActions";
import { useDispatch, useSelector } from "react-redux";
import DateItem from "../../components/DateItem/DateItem";
import { months, pathsBack } from "helpers/constances";
import axios from "axios";
import "./styles.scss";
import { selectUserMonth, selectUserYear } from "store/selectors";
import { getFetchedTimeStamp } from "helpers/helpers";
import { getApi } from "api/api";
import { checkFetchAuth } from "store/auth/actions";
import { store } from "store/store";

type fetchInfoType = {
  taskName: string;
  taskDescrip: string;
  id: number;
  forDate: string;
  isTaskDone: boolean;
}[];
type AppDispatch = typeof store.dispatch;

const Calendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userMonth = useSelector(selectUserMonth);
  const [today] = useState(new Date());
  const userYear = useSelector(selectUserYear);
  const [currentMonth, setCurrentMonth] = useState(
    userMonth || new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    userYear || new Date().getFullYear()
  );
  const [isLostYear, setIsLostYear] = useState(false);
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(currentYear, currentMonth + 1, 0).getDate()
  );
  const [fetchedInfo, setFetchedInfo] = useState<fetchInfoType>([]);
  let currentDates = [{ date: 0, taskCount: 0 }];

  // dispatch(checkFetchAuth())
  // const fetchBase = useSelector(selectFetchAuth);

  // кастыль для серва
  if (fetchedInfo) {
    for (let i = 0; i < daysInMonth; i++) {
      let count = 0;
      for (let y = 0; y < fetchedInfo.length; y++) {
        if (
          getFetchedTimeStamp(fetchedInfo[y].forDate).getDate() === i + 1 &&
          currentMonth ===
            getFetchedTimeStamp(fetchedInfo[y].forDate).getMonth() &&
          currentYear ===
            getFetchedTimeStamp(fetchedInfo[y].forDate).getFullYear() &&
          !fetchedInfo[y].isTaskDone
        ) {
          count = count + 1;
          currentDates[i] = {
            date: i + 1,
            taskCount: count,
          };
        } else {
          currentDates[i] = { date: i + 1, taskCount: count };
        }
      }
    }
  }
  //TODO: review ALL FILE!!!
  const fetchMonthTasks = () => {
    axios.get(getApi(pathsBack.taskBase)).then(({ data }) => {
      setFetchedInfo(data);
    });
  };

  const changeYear = (e: any) => {
    const betweens = e.target.textContent === "<" ? -1 : 1;
    setCurrentYear(currentYear + betweens);
  };

  const changeMonth = (e: any) => {
    const betweens = e.target.textContent === "<" ? -1 : 1;
    setCurrentMonth(currentMonth + betweens);
  };

  useEffect(() => {
    if (currentMonth < 0) {
      setCurrentMonth(11);
    }
    if (currentMonth > 11) {
      setCurrentMonth(0);
    }
    if (currentYear - 1 < new Date().getFullYear()) {
      setIsLostYear(true);
    } else {
      setIsLostYear(false);
    }
    setDaysInMonth(new Date(currentYear, currentMonth + 1, 0).getDate());
    localStorage.setItem("sessionStoryMonth", String(currentMonth));
    localStorage.setItem("sessionStoryYear", String(currentYear));
    dispatch(checkChoosedMonth(currentMonth));
    dispatch(checkChoosedYear(currentYear));
    fetchMonthTasks();
  }, [currentMonth, currentYear]);

  return (
    <div className="calendar">
      <div className="calendar__block">
        <div className="block__userValues">
          <div className="userValues__yearParams">
            <span className={isLostYear ? " hidden" : ""} onClick={changeYear}>
              {"<"}
            </span>
            <span>{currentYear}</span>
            <span onClick={changeYear}>{">"}</span>
          </div>
          <div className="userValues__monthParams">
            <span onClick={changeMonth}>{"<"}</span>
            <span className="monthParams__month">{months[currentMonth]}</span>
            <span onClick={changeMonth}>{">"}</span>
          </div>
        </div>
        <div className="block__container">
          <div className="block__dates">
            {currentDates.map((item) => (
              <DateItem
                key={item.date}
                date={item.date}
                taskCount={item.taskCount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calendar;
