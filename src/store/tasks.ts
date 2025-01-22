import instance from "api/index";
import {makeAutoObservable, observable} from "mobx";
import {DateStateProps} from "types/dates";
import {TTasksProps} from "types/tasks";
import {ERRORS_API} from "utils/constants.ts";

class TasksStore {
  tasksList: TTasksProps[] | null = null;

  taskListIsLoading: boolean = false;

  currentTasksList: TTasksProps[] | null = null;

  currentDate: number = new Date().getDate();

  selectedDate: number =
    Number(localStorage.getItem("sessionStoryDate")) || new Date().getDate();

  currentMonth = new Date().getMonth();

  selectedMonth =
    Number(localStorage.getItem("sessionStoryMonth")) || new Date().getMonth();

  currentYear = new Date().getFullYear();

  selectedYear =
    Number(localStorage.getItem("sessionStoryYear")) ||
    new Date().getFullYear();

  taskSearchValue: string = "";

  constructor() {
    makeAutoObservable(this, {tasksList: observable}, {deep: true});
  }

  setSelectedDate(date: number) {
    this.selectedDate = date;
  }

  setSelectedMonth(month: number) {
    this.selectedMonth = month;
    localStorage.setItem("sessionStoryMonth", String(month));
  }

  incrementUserMonth() {
    if (this.selectedMonth + 1 > 11) {
      this.selectedMonth = 0;
      localStorage.setItem("sessionStoryMonth", String(this.selectedMonth));
      return;
    }
    this.selectedMonth += 1;
    localStorage.setItem("sessionStoryMonth", String(this.selectedMonth));
  }

  decrementUserMonth() {
    if (this.selectedMonth - 1 < 0) {
      this.selectedMonth = 11;
      localStorage.setItem("sessionStoryMonth", String(this.selectedMonth));
      return;
    }
    this.selectedMonth -= 1;
    localStorage.setItem("sessionStoryMonth", String(this.selectedMonth));
  }

  setSelectedYear(year: number) {
    this.selectedYear = year;
    localStorage.setItem("sessionStoryYear", String(year));
  }

  incrementUserYear() {
    this.selectedYear += 1;
    localStorage.setItem("sessionStoryYear", String(this.selectedYear));
  }

  decrementUserYear() {
    this.selectedYear -= 1;
    localStorage.setItem("sessionStoryYear", String(this.selectedYear));
  }

  setSearchValue(value: string) {
    this.taskSearchValue = value;
  }

  fetchTasks() {
    this.taskListIsLoading = true;
    instance(`/${localStorage.tasksBase}`)
      .then(res => {
        this.tasksList = res.data;
      })
      .catch(res => {
        this.tasksList = [];
        if (res.status !== 200) {
          throw new Error(ERRORS_API[res.status as keyof typeof ERRORS_API]);
        }
      })
      .finally(() => {
        this.taskListIsLoading = false;
      });
  }

  postNewTask(obj: DateStateProps["postedTask"]) {
    instance.post(localStorage.tasksBase, {...obj}).then(res => {
      if (!this.tasksList) {
        this.tasksList = [...res.data];
        return;
      }
      this.tasksList.push(res.data);
    });
  }

  deleteTask(id: number) {
    instance.delete(`${localStorage.tasksBase}/${id}`).then(res => {
      if (res?.status === 200 && res.statusText === "OK") {
        this.tasksList = this.tasksList?.filter(el => el.id !== id) || [];
      }
    });
  }

  editTask({
    id,
    params,
  }: {
    id: number;
    params: {
      taskName?: string;
      taskDescrip?: string;
      forDate?: string;
      isTaskDone?: boolean;
    };
  }) {
    instance
      .put(`${localStorage.tasksBase}/${id}`, {
        ...params,
      })
      .then(res => {
        if (res?.status === 200 && res.statusText === "OK") {
          instance(`/${localStorage.tasksBase}`)
            .then(res => {
              this.tasksList = res.data;
            })
            .catch(res => {
              this.tasksList = [];
              if (res.status !== 200) {
                throw new Error(
                  ERRORS_API[res.status as keyof typeof ERRORS_API],
                );
              }
            });
        }
      });
  }
}
export default new TasksStore();
