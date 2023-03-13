import { createReducer, createAction } from "@reduxjs/toolkit";

const FETCH_ALL = createAction('FETCH_ALL');
const FETCH_POST = createAction('FETCH_POST');
const FETCH_BY_SEARCH = createAction('FETCH_BY_SEARCH');
const CREATE = createAction('CREATE');
const UPDATE = createAction('UPDATE');
const DELETE = createAction('DELETE');
const LIKE_POST = createAction('LIKE_POST');
const ADD_COMMENT = createAction('ADD_COMMENT');
const START_LOADING = createAction('START_LOADING');
const END_LOADING = createAction('END_LOADING');

const initialState = {isLoading:true, posts:[]};

export const posts = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_ALL, (state, action) => {
        return {
            ...state,
            posts: action.payload.posts,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages
        };
    })
    .addCase(FETCH_POST, (state, action) => {
        return {
            ...state,
            post: action.payload
        };
    })
    .addCase(FETCH_BY_SEARCH, (state, action) => {
        return {
            ...state,
            posts: action.payload
        };
    })
    .addCase(CREATE, (state, action) => {
        return {...state, posts: [...state.posts, action.payload]};
    })
    .addCase(UPDATE, (state, action) => {
        return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
    })
    .addCase(DELETE, (state, action) => {
        return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
    })
    .addCase(LIKE_POST, (state, action) => {
        return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
    })
    .addCase(ADD_COMMENT, (state, action) => {
        return {
            ...state, 
            posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
        }
    })
    .addCase(START_LOADING, (state, action) => {
        return {...state, isLoading: true}
    })
    .addCase(END_LOADING, (state, action) => {
        return {...state, isLoading: false}
    })
})
// const postSlice = createSlice({
//     initialState,
//     reducers: {
//         FETCH_ALL(state, action) {
//             return action.payload;
//         },
//       CREATE(state, action) {
//         return [state, action.payload];
//     },
//     UPDATE(state, action) {
//         return state.filter((post) => post._id !== action.payload);
//     },
//     DELETE(state, action) {
//         return state.map((post) => post._id === action.payload._id ? action.payload : state);
//     },
//     LIKE_POST(state, action) {
//           return state.posts.map((post) => post._id === action.payload._id ? action.payload : state);
//       },
//     },
//   })
  
//   export default postSlice.reducer;



// action.payload is used to receive paramiters or value from the user 
// export const posts = createReducer([],{
//     FETCH_ALL: (state, action) =>{
//         return action.payload;
//     },
//     CREATE: (state, action) =>{
//         return [state, action.payload];
//     },
//     UPDATE: (state, action) =>{
//         return state.filter((post) => post._id !== action.payload);
//     },
//     DELETE: (state, action) =>{
//         return state.map((post) => post._id === action.payload._id ? action.payload : state);
//     },
//     LIKE_POST: (state, action) =>{
//         console.log(state);
//         return state.map((post) => post._id === action.payload._id ? action.payload : state);
//     },
// })




