import {DateStateProps} from "./types";

const initialStateDate: DateStateProps["date"] = {
  date: NaN,
  month: NaN,
  year: NaN,
  dateInfo: [],
  isTaskEdit: false,
  error: null,
};
export default initialStateDate;
