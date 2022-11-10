import {createSelector} from "@reduxjs/toolkit";
import {DateStateProps} from "./types";

const rootSelect = (state: DateStateProps) => state;
const selectDateState = createSelector(rootSelect, root => root.date);

export const selectUserDate = createSelector(
  selectDateState,
  state => state.date,
);
export const selectUserMonth = createSelector(
  selectDateState,
  state => state.month,
);
export const selectUserYear = createSelector(
  selectDateState,
  state => state.year,
);
export const selectIsEditTask = createSelector(
  selectDateState,
  state => state.isTaskEdit,
);
