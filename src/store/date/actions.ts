import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import getApi from "api/api";
import axios from "axios";
import {pathsBack} from "constances/constances";
import {DateStateProps} from "./types";

export const checkUserDate = createAction<number>("DATE_checkDate");
export const checkUserMonth = createAction<number>("DATE_checkMonth");
export const checkUserYear = createAction<number>("DATE_checkYear");

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
    console.log(responce, "resp data");
    // return responce.status===200;
    return responce.data;
  } catch (e) {
    return e;
  }
});
