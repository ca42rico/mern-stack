import React from "react";
import * as ReactDOM from "react-dom";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import posts from "./Post/PostReducer";
import authentication from "./Authentication/AuthenticationReducers";
import App from "./App";
import "./index.css";

const enhancers = [applyMiddleware(thunk)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialStore = createStore(
  combineReducers({ posts, authentication }),
  {},
  composeEnhancers(compose(...enhancers))
);

ReactDOM.render(<App store={initialStore} />, document.getElementById("root"));
