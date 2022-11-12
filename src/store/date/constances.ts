import {DateStateProps} from "./types";

const initialStateDate: DateStateProps["date"] = {
  date: NaN,
  month: NaN,
  year: NaN,
  dateInfo: [],
  taskList: [],
  isTaskEdit: false,
  isTaskDelete: false,
  isTaskPost: false,
  postedTask: {
    taskName: "",
    taskDescrip: "",
    isTaskDone: false,
    id: 0,
    forDate: "",
  },
  error: null,
};
export default initialStateDate;
