import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {
  checkAuth,
  checkLoginToken,
  checkUserName,
  dropLoginToken,
} from "store/auth/actions";
import initialStateAuth from "./constances";
import {AuthStateProps, CheckAuthType, CheckUserNameType} from "./types";

// TODO: тип из тулкита

export default createReducer<AuthStateProps>(initialStateAuth, {
  [checkAuth.type]: (state, action: CheckAuthType) => {
    state.isAuth = action.payload;
  },
  [checkUserName.type]: (state, action: CheckUserNameType) => {
    state.userName = action.payload;
  },
  [dropLoginToken.type]: (state, action: CheckUserNameType) => {
    state.fetchedToken = action.payload;
  },
  [checkLoginToken.fulfilled.type]: (state, action: PayloadAction<string>) => {
    state.error = null;
    state.fetchedToken = action.payload;
  },
});
