import { createReducer } from "@reduxjs/toolkit";

// initial state of posts
const allPosts = [];

// action.payload is used to receive paramiters or value from the user 
export const posts = createReducer(allPosts,{
    FETCH_ALL: (state, action) =>{
        return action.payload;
    },
    CREATE: (state, action) =>{
        return [...allPosts, action.payload];
    },
    UPDATE: (state, action) =>{
        return allPosts.filter((post) => post.id !== action.payload);
    },
    DELETE: (state, action) =>{
        return allPosts.map((post) => post._id === action.payload._id ? action.payload : allPosts);
    },
})




