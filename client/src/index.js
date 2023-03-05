import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {posts} from './reducers/posts.js';


import App from "./App";
import './index.css';

const store = configureStore({
    reducer: {
        posts
    }
}, compose(applyMiddleware(thunk)));



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

