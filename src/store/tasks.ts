import instance from "api/index";
import {makeAutoObservable} from "mobx";
import {TTasksProps} from "types/tasks";

class TasksStore {
  tasksList: TTasksProps[] = [];

  userDate: number | null = null;

  userMonth = new Date().getMonth();

  userYear = new Date().getFullYear();

  constructor() {
    makeAutoObservable(this, {}, {deep: true});
  }

  setUserDate(date: number) {
    this.userDate = date;
  }

  setUserMonth(month: number) {
    this.userMonth = month;
  }

  incrementUserMonth() {
    this.userMonth += 1;
  }

  decrementUserMonth() {
    this.userMonth -= 1;
  }

  setUserYear(year: number) {
    this.userYear = year;
  }

  incrementUserYear() {
    this.userYear += 1;
  }

  decrementUserYear() {
    this.userYear -= 1;
  }

  fetchTasks() {
    instance(`/${localStorage.tasksBase}`).then(res => {
      this.tasksList = res.data;
    });
    //   .catch(res => {
    //     this.tasksList = null;
    //     if (res.status !== 200) {
    //       throw new Error(ERRORS_API[res.status as keyof typeof ERRORS_API]);
    //     }
    //   });
  }
}
export default new TasksStore();
