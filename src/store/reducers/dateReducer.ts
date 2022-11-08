// TODO: на не используемы пременные линтер должен ругаться
/* eslint no-param-reassign : "error" */
import {createReducer} from "@reduxjs/toolkit";
import {
  checkChoosedDate,
  checkChoosedMonth,
  checkChoosedYear,
} from "store/actions/dateActions";

type InitialStateType = {
  dateInfo: [];
  date: number;
  month: number;
  year: number;
  error: null;
};

const initialState: InitialStateType = {
  dateInfo: [],
  date: NaN,
  month: NaN,
  year: NaN,
  error: null,
};
type CheckChoosedMonthTypes = {type: string; payload: number};
type CheckChoosedDateTypes = {type: string; payload: number};
type CheckChoosedYearTypes = {type: string; payload: number};

export default createReducer(initialState, {
  [checkChoosedDate.type](
    state: InitialStateType,
    action: CheckChoosedDateTypes,
  ) {
    state.date = action.payload;
  },
  [checkChoosedMonth.type](
    state: InitialStateType,
    action: CheckChoosedMonthTypes,
  ) {
    state.month = action.payload;
  },
  [checkChoosedYear.type](
    state: InitialStateType,
    action: CheckChoosedYearTypes,
  ) {
    state.year = action.payload;
  },
});
