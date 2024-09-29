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

  constructor() {
    makeAutoObservable(this, {tasksList: observable}, {deep: true});
  }

  setSelectedDate(date: number) {
    this.selectedDate = date;
  }

  setSelectedMonth(month: number) {
    this.selectedMonth = month;
  }

  incrementUserMonth() {
    this.selectedMonth += 1;
  }

  decrementUserMonth() {
    this.selectedMonth -= 1;
  }

  setSelectedYear(year: number) {
    this.selectedYear = year;
  }

  incrementUserYear() {
    this.selectedYear += 1;
  }

  decrementUserYear() {
    this.selectedYear -= 1;
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
