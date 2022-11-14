import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import getApi from "api/api";
import axios from "axios";
import {pathsBack} from "constances/constances";
import {DateStateProps} from "./types";

export const checkUserDate = createAction<number>("DATE_checkDate");
export const checkUserMonth = createAction<number>("DATE_checkMonth");
export const checkUserYear = createAction<number>("DATE_checkYear");

export const fetchTaskBase = createAsyncThunk<DateStateProps>(
  "DATE_fetchTaskBase",
  async () => {
    try {
      const responce = await axios.get(getApi(pathsBack.taskBase));
      if (responce.status >= 429) {
        throw new Error('Can"t edit task');
      }
      return responce.data;
    } catch (e) {
      return e;
    }
  },
);

export const editChoosedTask = createAsyncThunk<
  DateStateProps,
  {id: number; param: {}}
>("DATE_putTask", async ({id, param}) => {
  try {
    const responce = await axios.put(`${getApi(pathsBack.taskBase)}/${id}`, {
      ...param,
    });
    if (responce.status >= 400) {
      throw new Error('Can"t edit task');
    }
    // return responce.status===200
    const isEdit = [responce.status === 200, responce.data];
    return isEdit[0];
  } catch (e) {
    return e;
  }
});

export const postNewTask = createAsyncThunk<
  DateStateProps,
  {
    obj: {
      taskName: string;
      taskDescrip: string;
      isTaskDone: boolean;
      // id: number;
      forDate: string;
    };
  }
>("DATE_postNewTask", async ({obj}) => {
  try {
    const responce = await axios.post(getApi(pathsBack.taskBase), obj);
    if (responce.status >= 400) {
      throw new Error('Can"t post task');
    }
    // const isPost = [responce.status === 200, responce.data];
    // return isPost[0];
    return responce.data;
  } catch (e) {
    return e;
  }
});
export const deleteChoosedTask = createAsyncThunk<DateStateProps, {id: number}>(
  "DATE_delTAsk",
  async ({id}) => {
    try {
      const responce = await axios.delete(
        `${getApi(pathsBack.taskBase)}/${id}`,
      );
      if (responce.status >= 400) {
        throw new Error('Can"t delete task');
      }
      const delResult = [responce.status === 200, responce.data];
      return delResult[0];
    } catch (e) {
      return e;
    }
  },
);
