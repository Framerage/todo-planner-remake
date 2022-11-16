import {createSelector} from "@reduxjs/toolkit";
import {Store} from "../store";

const rootSelect = (state: Store) => state.date;

export const selectUserDate = createSelector(rootSelect, state => state.date);
export const selectUserMonth = createSelector(rootSelect, state => state.month);
export const selectUserYear = createSelector(rootSelect, state => state.year);
export const selectFetchedTaskBase = createSelector(
  rootSelect,
  state => state.taskList,
);
export const selectIsEditTask = createSelector(
  rootSelect,
  state => state.isTaskEdit,
);
export const selectPostedTask = createSelector(
  rootSelect,
  state => state.postedTask,
);
export const selectIsTaskDelete = createSelector(
  rootSelect,
  state => state.isTaskDelete,
);
