import { createReducer } from "@reduxjs/toolkit";
import { checkAuth, checkFetchAuth, checkUserName } from "store/auth/actions";
export type AuthState={
    isLoading:boolean,
    isAuth:boolean,
    isFetchAuth:{},
    isErrorFetch:null,
    userName:string,
    error:null
}
// TODO: тип из тулкита
type checkAuthType={ type: string, payload: boolean }
type checkUserNameType={ type: string, payload: string }
// type checkFetchType={ type: string, payload: {} }

const initialState:AuthState = {
        isLoading: false,
        isFetchAuth:{},
        isErrorFetch:null,
        isAuth: false,
        userName:'',
        error: null,

};

export default createReducer<AuthState>(initialState, {
    [checkAuth.type]:  (state, action: checkAuthType)=> {
        state.isAuth = action.payload
    },
    [checkUserName.type]:  (state , action: checkUserNameType)=> {
        state.userName = action.payload
    },
    [checkFetchAuth.fulfilled.type]:(state,action:any)=>{
        console.log(action.payload, 'payload')
        // state.error=null,
        state.isFetchAuth=action.payload;
    },
    
    // [checkFetchAuth.pending]:(state:initialStateTypes,action:any)=>{.
    //     state.isErrorFetch=null
    // }
})