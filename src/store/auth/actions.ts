import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import getApi from "api/api";
import axios from "axios";
import {pathsBack} from "constances/constances";

export const checkAuth = createAction<boolean>("AUTH_isAuth");
export const checkUserName = createAction<string>("AUTH_userName");

interface FetchTodoType {
  id: string;
  user: {
    userName: string;
    password: string;
  };
}

// TODO: настроить форматирование при созхранениии (и все что с ним связано )
export const checkFetchAuth = createAsyncThunk<
  FetchTodoType,
  {userName: string}
>("FETCH_isAuthFetch", async ({userName}) => {
  try {
    const responce = await axios.get(getApi(pathsBack.login), {
      data: {},
      params: {},
    });
    if (responce.status >= 400) {
      throw new Error('Can"t get logins');
    }
    console.log(userName);
    // console.log(responce, "resp");
    return responce.data;
  } catch (e) {
    return e;
  }
});
