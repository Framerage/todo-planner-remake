import {createReducer} from "@reduxjs/toolkit";
import {checkAuth, checkLoginBase, checkUserName} from "store/auth/actions";
import {AuthStateProps} from "./types";

// TODO: тип из тулкита
type CheckAuthType = {type: string; payload: boolean};
type CheckUserNameType = {type: string; payload: string};
// type checkFetchType={ type: string, payload: {} }

const initialState: AuthStateProps["auth"] = {
  isLoading: false,
  fetchedLoginBase: [
    {
      id: "",
      user: {
        userName: "",
        password: "",
      },
    },
  ],
  fetchedToken: "",
  isErrorFetch: null,
  isAuth: false,
  userName: "",
  error: null,
};

export default createReducer<AuthStateProps["auth"]>(initialState, {
  [checkAuth.type]: (state, action: CheckAuthType) => {
    state.isAuth = action.payload;
  },
  [checkUserName.type]: (state, action: CheckUserNameType) => {
    state.userName = action.payload;
  },
  [checkLoginBase.fulfilled.type]: (state, action: any) => {
    console.log(action.payload, "payload");
    // state.error=null,
    state.fetchedToken = action.payload;
  },

  // [checkFetchAuth.pending]:(state:initialStateTypes,action:any)=>{.
  //     state.isErrorFetch=null
  // }
});
