import { createSelector } from "@reduxjs/toolkit";
import { authStateProps } from "./types";

const rootSelect= (state: authStateProps) => state;
const selectAuthState=createSelector(rootSelect,root=>root.auth);

export const selectIsAuth=createSelector(selectAuthState,state=>state.isAuth);
export const selectUserName=createSelector(selectAuthState,state=>state.userName);
export const selectFetchAuth=createSelector(selectAuthState,state=>state.isFetchAuth);