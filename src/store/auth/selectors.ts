import {createSelector} from "@reduxjs/toolkit";
import {AuthStateProps} from "./types";

const rootSelect = (state: AuthStateProps) => state;
const selectAuthState = createSelector(rootSelect, root => root.auth);

export const selectIsAuth = createSelector(
  selectAuthState,
  state => state.isAuth,
);
export const selectUserName = createSelector(
  selectAuthState,
  state => state.userName,
);
export const selectFetchLoginBase = createSelector(
  selectAuthState,
  state => state.fetchedLoginBase,
);
export const selectFetchedToken = createSelector(
  selectAuthState,
  state => state.fetchedToken,
);
