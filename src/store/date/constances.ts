import {DateStateProps} from "./types";

const initialStateDate: DateStateProps = {
  date: Number(localStorage.sessionStoryDate),
  month: Number(localStorage.sessionStoryMonth),
  year: Number(localStorage.sessionStoryYear),
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
