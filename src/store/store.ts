import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import dateReducer from "./reducers/dateReducer";

const rootReducer=combineReducers({
    auth: authReducer,
    date: dateReducer,
})

export const store = configureStore({
    reducer:rootReducer,
})