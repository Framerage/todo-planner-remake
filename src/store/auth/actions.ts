import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import getApi from "api/api";
import axios from "axios";
import {pathsBack} from "constances/constances";
import {AuthStateProps} from "./types";

export const checkAuth = createAction<boolean>("AUTH_isAuth");
export const checkUserName = createAction<string>("AUTH_userName");
export const dropLoginToken = createAction<string>("AUTH_dropLogin");

export const checkLoginToken = createAsyncThunk<
  AuthStateProps,
  {userName: string | null; userPass: string | null}
>("FETCH_isAuthFetch", async ({userName, userPass}) => {
  if (userName && userPass) {
    try {
      const responce = await axios.get(getApi(pathsBack.login), {
        data: {},
        params: {},
      });
      if (responce.status >= 400) {
        throw new Error('Can"t get logins');
      }
      const gettedToken = responce.data.filter(
        (el: {user: {userName: string; userPass: string}; token: string}) =>
          el.user.userName === userName && el.user.userPass === userPass,
      );
      return gettedToken[0].token;
    } catch (e) {
      return e;
    }
  }
});
