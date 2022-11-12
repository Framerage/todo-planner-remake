import {DateStateProps} from "./types";

const initialStateDate: DateStateProps["date"] = {
  date: NaN,
  month: NaN,
  year: NaN,
  dateInfo: [],
  taskList: [],
  isTaskEdit: false,
  isTaskDelete: false,
  error: null,
};
export default initialStateDate;
