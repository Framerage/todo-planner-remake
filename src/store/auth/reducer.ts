import {createReducer} from "@reduxjs/toolkit";
import {
  checkAuth,
  checkLoginToken,
  checkUserName,
  dropLoginToken,
} from "store/auth/actions";
import initialStateAuth from "./constances";
import {AuthStateProps, CheckAuthType, CheckUserNameType} from "./types";

// TODO: тип из тулкита

export default createReducer<AuthStateProps["auth"]>(initialStateAuth, {
  [checkAuth.type]: (state, action: CheckAuthType) => {
    state.isAuth = action.payload;
  },
  [checkUserName.type]: (state, action: CheckUserNameType) => {
    state.userName = action.payload;
  },
  [dropLoginToken.type]: state => {
    state.fetchedToken = "";
  },
  [checkLoginToken.fulfilled.type]: (state, action: any) => {
    state.error = null;
    state.fetchedToken = action.payload;
  },

  // [checkFetchAuth.pending]:(state:initialStateTypes,action:any)=>{.
  //     state.isErrorFetch=null
  // }
});
