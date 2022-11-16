import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {
  checkUserDate,
  checkUserMonth,
  checkUserYear,
  deleteChoosedTask,
  editChoosedTask,
  fetchTaskBase,
  postNewTask,
} from "./actions";
import initialStateDate from "./constances";
import {ActionsUserDateMonthYearProps, DateStateProps} from "./types";

export default createReducer<DateStateProps>(initialStateDate, {
  [checkUserDate.type]: (state, action: ActionsUserDateMonthYearProps) => {
    state.date = action.payload;
  },
  [checkUserMonth.type]: (state, action: ActionsUserDateMonthYearProps) => {
    state.month = action.payload;
  },
  [checkUserYear.type]: (state, action: ActionsUserDateMonthYearProps) => {
    state.year = action.payload;
  },
  [fetchTaskBase.fulfilled.type]: (state, action: PayloadAction<[]>) => {
    state.taskList = action.payload;
  },
  [editChoosedTask.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
    state.isTaskEdit = action.payload;
  },
  [postNewTask.fulfilled.type]: (
    state,
    action: PayloadAction<DateStateProps["postedTask"]>,
  ) => {
    state.postedTask = action.payload;
  },
  [deleteChoosedTask.fulfilled.type]: (
    state,
    action: PayloadAction<boolean>,
  ) => {
    state.isTaskDelete = action.payload;
  },
});
