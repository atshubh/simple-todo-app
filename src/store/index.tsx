import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

// Debugging purposes
const store = configureStore({
  reducer: rootReducer,
});

export default store;
