import {createSelector} from "@reduxjs/toolkit";

import {Store} from "../store";

const rootSelect = (state: Store) => state.auth;

export const selectIsAuth = createSelector(rootSelect, state => state.isAuth);
export const selectUserName = createSelector(
  rootSelect,
  state => state.userName,
);
export const selectFetchLoginBase = createSelector(
  rootSelect,
  state => state.fetchedLoginBase,
);
export const selectFetchedToken = createSelector(
  rootSelect,
  state => state.fetchedToken,
);
