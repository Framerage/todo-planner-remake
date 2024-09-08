import instance from "api/index";
import {action, computed, makeAutoObservable, observable, observe} from "mobx";
import {observer} from "mobx-react-lite";
import {DateStateProps} from "types/dates";
import {TTasksProps} from "types/tasks";
import {ERRORS_API} from "utils/constants.ts";

class TasksStore {
  tasksList: TTasksProps[] | null = null;

  currentDate: number = new Date().getDate();

  selectedDate: number = new Date().getDate();

  currentMonth = new Date().getMonth();

  selectedMonth = new Date().getMonth();

  currentYear = new Date().getFullYear();

  selectedYear = new Date().getFullYear();

  constructor() {
    makeAutoObservable(this, {tasksList: observable, postNewTask: action});
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
    instance(`/${localStorage.tasksBase}`)
      .then(res => {
        this.tasksList = res.data;
      })
      .catch(res => {
        this.tasksList = [];
        if (res.status !== 200) {
          throw new Error(ERRORS_API[res.status as keyof typeof ERRORS_API]);
        }
      });
  }

  // set postNewTask(obj: DateStateProps["postedTask"]) {
  //   instance.post(localStorage.tasksBase, {...obj}).then(res => {
  //     // this.tasksList.push(res.data);
  //     this.tasksList = [...this.tasksList, res.data];
  //   });
  // }
  postNewTask(obj: DateStateProps["postedTask"]) {
    instance.post(localStorage.tasksBase, {...obj}).then(res => {
      if (!this.tasksList) {
        this.tasksList = [...res.data];
        return;
      }
      this.tasksList.push(res.data);
    });
  }
}
export default new TasksStore();
