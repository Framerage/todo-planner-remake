import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import getApi from "api/api";
import axios from "axios";
import {pathsBack} from "constances/constances";
import {AuthStateProps} from "./types";

export const checkAuth = createAction<boolean>("AUTH_isAuth");
export const checkUserName = createAction<string>("AUTH_userName");

// TODO: настроить форматирование при созхранениии (и все что с ним связано )
export const checkLoginBase = createAsyncThunk<
  AuthStateProps,
  {userName: string; userPass: string}
>("FETCH_isAuthFetch", async ({userName, userPass}) => {
  try {
    const responce = await axios.get(getApi(pathsBack.login), {
      data: {},
      params: {},
    });
    if (responce.status >= 400) {
      throw new Error('Can"t get logins');
    }
    let gettedToken;
    console.log(userName, userPass);
    console.log(responce.data, "resp");

    if (userName && userPass) {
      gettedToken = responce.data.filter(
        (el: {user: {userName: string; userPass: string}; token: string}) =>
          el.user.userName === userName && el.user.userPass === userPass,
      );
      // console.log(gettedToken, "gettedToken");
    }
    return gettedToken[0].token;
    // return responce.data;
  } catch (e) {
    return e;
  }
});
