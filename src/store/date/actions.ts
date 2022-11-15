import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {
  deleteFetchedData,
  getFetchedData,
  postFetchedData,
  putFetchedData,
} from "api/api";
import {DateStateProps, PostedObj} from "./types";

export const checkUserDate = createAction<number>("DATE_checkDate");
export const checkUserMonth = createAction<number>("DATE_checkMonth");
export const checkUserYear = createAction<number>("DATE_checkYear");

export const fetchTaskBase = createAsyncThunk<DateStateProps>(
  "DATE_fetchTaskBase",
  getFetchedData,
);
//   () => {
//     return axiosGet(PATHS_BACK.taskBase);
//   },
// );
// helper для апи( урл, пут/гет, параметры)
// проверку по ключам для ошибокj,
// naming of functions
export const editChoosedTask = createAsyncThunk("DATE_putTask", putFetchedData);

export const postNewTask = createAsyncThunk<DateStateProps, PostedObj>(
  "DATE_postNewTask",
  postFetchedData,
);

export const deleteChoosedTask = createAsyncThunk(
  "DATE_delTAsk",
  deleteFetchedData,
);
