import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth";
import dateReducer from "./reducers/dateReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  date: dateReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;