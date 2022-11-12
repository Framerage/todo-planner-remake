import {createReducer} from "@reduxjs/toolkit";
import {
  checkUserDate,
  checkUserMonth,
  checkUserYear,
  deleteChoosedTask,
  editChoosedTask,
  fetchTaskBase,
} from "./actions";
import initialStateDate from "./constances";
import {ActionsUserDateMonthYearProps, DateStateProps} from "./types";

export default createReducer<DateStateProps["date"]>(initialStateDate, {
  [checkUserDate.type]: (state, action: ActionsUserDateMonthYearProps) => {
    state.date = action.payload;
  },
  [checkUserMonth.type]: (state, action: ActionsUserDateMonthYearProps) => {
    state.month = action.payload;
  },
  [checkUserYear.type]: (state, action: ActionsUserDateMonthYearProps) => {
    state.year = action.payload;
  },
  [fetchTaskBase.fulfilled.type]: (state, action: any) => {
    state.taskList = action.payload;
  },
  [editChoosedTask.fulfilled.type]: (state, action: any) => {
    state.isTaskEdit = action.payload;
  },
  [deleteChoosedTask.fulfilled.type]: (state, action: any) => {
    state.isTaskDelete = action.payload;
  },
});
