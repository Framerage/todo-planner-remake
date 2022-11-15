import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth";
import {AuthStateProps} from "./auth/types";
import dateReducer from "./date";
import {DateStateProps} from "./date/types";

export type Store = {
  date: DateStateProps;
  auth: AuthStateProps;
};

const rootReducer = combineReducers<Store>({
  auth: authReducer,
  date: dateReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
