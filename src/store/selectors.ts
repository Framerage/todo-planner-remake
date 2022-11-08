import { createSelector } from "@reduxjs/toolkit";

type stateType={
    date:{
        date:number,
        month:number,
        year:number
        }

}
const rootSelect= (state: stateType) => state;
const selectDateState = createSelector(rootSelect,root=>root.date);

export const selectUserDate=createSelector(selectDateState,state=>state.date);
export const selectUserMonth=createSelector(selectDateState,state=>state.month);
export const selectUserYear=createSelector(selectDateState,state=>state.year);

