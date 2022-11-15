import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {getTokenForLogin} from "api/api";
import {AuthStateProps} from "./types";

export const checkAuth = createAction<boolean>("AUTH_isAuth");
export const checkUserName = createAction<string>("AUTH_userName");
export const dropLoginToken = createAction<string>("AUTH_dropLogin");

export const checkLoginToken = createAsyncThunk<
  AuthStateProps,
  {userName: string | null; userPass: string | null}
>("AUTH_isAuthFetch", getTokenForLogin);
