/* eslint no-param-reassign : "error" */

import {createReducer} from "@reduxjs/toolkit";
import {checkAuth, checkFetchAuth, checkUserName} from "store/auth/actions";

export type AuthState = {
  isLoading: boolean;
  isAuth: boolean;
  isFetchAuth: {};
  isErrorFetch: null;
  userName: string;
  error: null;
};
// TODO: тип из тулкита
type CheckAuthType = {type: string; payload: boolean};
type CheckUserNameType = {type: string; payload: string};
// type checkFetchType={ type: string, payload: {} }

const initialState: AuthState = {
  isLoading: false,
  isFetchAuth: {},
  isErrorFetch: null,
  isAuth: false,
  userName: "",
  error: null,
};

export default createReducer<AuthState>(initialState, {
  [checkAuth.type]: (state: AuthState, action: CheckAuthType) => {
    state.isAuth = action.payload;
  },
  [checkUserName.type]: (state: AuthState, action: CheckUserNameType) => {
    state.userName = action.payload;
  },
  [checkFetchAuth.fulfilled.type]: (state: AuthState, action: any) => {
    // console.log(action.payload, "payload");
    // state.error=null,
    state.isFetchAuth = action.payload;
  },

  // [checkFetchAuth.pending]:(state:initialStateTypes,action:any)=>{.
  //     state.isErrorFetch=null
  // }
});
