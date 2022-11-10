import {createReducer} from "@reduxjs/toolkit";
import {
  checkUserDate,
  checkUserMonth,
  checkUserYear,
  editChoosedTask,
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
  [editChoosedTask.fulfilled.type]: (state, action: any) => {
    console.log(action.payload, " result select");
    // state.error = null;
    state.isTaskEdit = action.payload;
  },
});
