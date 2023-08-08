import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "./task.interface";
import { TodoAPI } from "../../apis/todo.api";

export interface ToDoListState {
  list: Task[];
  isLoading: boolean;
}

const initialToDoListState: ToDoListState = {
  list: [],
  isLoading: false,
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState: initialToDoListState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchToDos.fulfilled,
      (state, action: PayloadAction<{ todos: Task[] }>) => {
        console.log(action.payload);
        state.list = action.payload.todos;
      },
    );
  },
});

export const fetchToDos = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await TodoAPI.fetchAllTasks();
  return response.data;
});

export const {} = todoListSlice.actions;

export default todoListSlice.reducer;
