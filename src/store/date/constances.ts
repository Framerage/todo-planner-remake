import {DateStateProps} from "./types";

const initialStateDate: DateStateProps["date"] = {
  date: NaN || Number(localStorage.sessionStoryDate),
  month: NaN || Number(localStorage.sessionStoryMonth),
  year: NaN || Number(localStorage.sessionStoryYear),
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
