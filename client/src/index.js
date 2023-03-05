import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {posts} from './reducers/posts.js';
import {authReducer} from './reducers/auth.js';


import App from "./App";
import './index.css';

const store = configureStore({
    reducer: {
        posts, authReducer
    }
}, compose(applyMiddleware(thunk)));



ReactDOM.render(
    <GoogleOAuthProvider clientId="911641069648-6ed8spt8jg317l0tht184feke10lirle.apps.googleusercontent.com">
        <Provider store={store}>
            <App/>
        </Provider>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);

