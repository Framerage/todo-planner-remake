import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {
  editFirstSymbolToUpperCase,
  getFetchedTimeStamp,
  getFullSelectedDate,
} from "utils/helpers";
import {MONTHS, WEEK_DAYS} from "utils/constants.ts";
import tasksStore from "store/tasks.ts";
import {observer} from "mobx-react-lite";
import StepBtn from "components/StepBtn/StepBtn";
import Searcher from "components/Searcher/Searcher";
import styles from "./styles.module.scss";

interface IFormCreatingData {
  taskName: string;
  taskDescription: string;
}

export const DateFormCreating: FC = observer(() => {
  const {register, handleSubmit, setValue, setFocus} =
    useForm<IFormCreatingData>();

  const selectedDate = tasksStore.selectedDate;
  const selectedMonth = tasksStore.selectedMonth;
  const selectedYear = tasksStore.selectedYear;
  const [aWeekDay, setAweekDay] = useState("");
  const fullDate = useMemo(
    () => getFullSelectedDate(selectedYear, selectedMonth, selectedDate, 0),
    [selectedYear, selectedMonth, selectedDate],
  );

  useEffect(() => {
    setAweekDay(WEEK_DAYS[getFetchedTimeStamp(fullDate).getDay()]);
  }, []);

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

  const daysInMonth = useMemo(
    () =>
      new Date(
        tasksStore.selectedYear,
        tasksStore.selectedMonth + 1,
        0,
      ).getDate(),
    [tasksStore.selectedYear, tasksStore.selectedMonth],
  );

  const handleChangeDate = useCallback(
    (newDay: number) => {
      if (selectedDate + newDay > daysInMonth) {
        tasksStore.setSelectedDate(1);
        return;
      }
      if (selectedDate + newDay < 1) {
        tasksStore.setSelectedDate(daysInMonth);
        return;
      }
      tasksStore.setSelectedDate(selectedDate + newDay);
    },
    [selectedDate, selectedMonth, selectedYear, daysInMonth],
  );

  return (
    <div className={styles.dateFormWrapper}>
      <Searcher />

      <h2 className={styles.dateHeadline}>
        Tasklist of {selectedDate} {MONTHS[selectedMonth]} {selectedYear} (
        {aWeekDay})
      </h2>
      <form
        className={styles.dateForm}
        onSubmit={handleSubmit(handleCreateTask)}
      >
        <input
          id="taskNameField"
          {...register("taskName", {required: true})}
          placeholder="name of task"
          className={styles.dateField}
        />

        <input
          {...register("taskDescription", {required: true})}
          placeholder="description of task"
          className={styles.dateField}
        />
        <button className={styles.creatingBtn}>Create task</button>
      </form>
      <div className={styles.dayArrows}>
        <StepBtn
          btnText="<"
          onClickStepBtn={() => {
            handleChangeDate(-1);
            tasksStore.setSearchValue("");
          }}
          extraClass={styles.arrow}
        />
        <StepBtn
          btnText=">"
          onClickStepBtn={() => {
            handleChangeDate(1);
            tasksStore.setSearchValue("");
          }}
          extraClass={styles.arrow}
        />
      </div>
    </div>
  );
});
