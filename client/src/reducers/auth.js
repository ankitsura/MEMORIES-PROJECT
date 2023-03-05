import { createReducer, createAction } from "@reduxjs/toolkit";

const AUTH = createAction('AUTH');
const LOGOUT = createAction('LOGOUT');
const authData = {}

export const authReducer = createReducer(authData, (builder) => {
  builder
    .addCase(AUTH, (state, action) => {
        localStorage.setItem('profile', JSON.stringify({...action?.data}));
        return {...state, authData:action?.data};

    })
    .addCase(LOGOUT, (state, action) => {
        localStorage.clear();
        return {...state, authData:null};

    })
})
