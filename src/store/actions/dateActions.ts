import {createAction} from "@reduxjs/toolkit";

export const checkChoosedDate = createAction<number>("CHECK_choosedDate");

export const checkChoosedMonth = createAction<number>("CHECK_choosedMonth");

export const checkChoosedYear = createAction<number>("CHECK_choosedYear");
