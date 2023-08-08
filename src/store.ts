import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TodoListReducer from "./features/todo-list/todo-list.slice";

// Debugging purposes
const store = configureStore({
  reducer: {
    todoListReducer: TodoListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
