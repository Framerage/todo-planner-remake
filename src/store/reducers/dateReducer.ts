// TODO: на не используемы пременные линтер должен ругаться

import { createAction, createReducer } from "@reduxjs/toolkit";
import { checkChoosedDate, checkChoosedMonth, checkChoosedYear } from "store/actions/dateActions";

type initialStateType= {
    dateInfo:[],
    date:number,
    month:number,
    year:number,
    error:null
}

const initialState:initialStateType = {
    dateInfo: [],
    date:NaN,
    month:NaN,
    year:NaN,
    error: null,
  };
  type checkChoosedDateTypes={type:string,payload:number};
  type checkChoosedMonthTypes={type:string,payload:number};
  type checkChoosedYearTypes={type:string,payload:number};
  
  export default createReducer(initialState,{
    [checkChoosedDate.type]:function(state:initialStateType,action:checkChoosedDateTypes){
        state.date= action.payload;
    },    
    [checkChoosedMonth.type]:function(state:initialStateType,action:checkChoosedMonthTypes){
        state.month = action.payload;
    },    
    [checkChoosedYear.type]:function(state:initialStateType,action:checkChoosedYearTypes){
        state.year= action.payload;
    }
}
)