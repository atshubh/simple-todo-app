import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { type Task } from "./task.interface";
import { TodoAPI } from "../../apis/todo.api";
import {
  type UpdateTaskActionPayload,
  type AddTaskActionPayload,
} from "./task-actions.interface";

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
    builder
      .addCase(fetchToDos.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.list = action.payload;
      })
      .addCase(
        addToDo.fulfilled,
        (state, action: PayloadAction<AddTaskActionPayload>) => {
          state.list = [...state.list, action.payload];
        },
      )
      .addCase(
        toDoCheckUpdate.fulfilled,
        (state, action: PayloadAction<UpdateTaskActionPayload>) => {
          const taskToUpdate = state.list.find(
            (task) => task.id === action.payload.id,
          );
          if (taskToUpdate) taskToUpdate.completed = action.payload.completed;
        },
      )
      .addCase(deleteToDo.fulfilled, (state, action: PayloadAction<number>) => {
        const taskToUpdate = state.list.find(
          (task) => task.id === action.payload,
        );
        if (taskToUpdate) taskToUpdate.deleted = true;
      });
  },
});

export const fetchToDos = createAsyncThunk("api/task", async () => {
  const response = await TodoAPI.fetchAllTasks();
  return response.data.toDos;
});

export const addToDo = createAsyncThunk(
  "api/task/add",
  async (payload: AddTaskActionPayload) => {
    const task = { ...payload };
    await TodoAPI.addToDo(task);
    return task;
  },
);

export const toDoCheckUpdate = createAsyncThunk(
  "api/task/toDoCheckUpdate",
  async (payload: UpdateTaskActionPayload) => {
    await TodoAPI.updateToDo(payload);
    return payload;
  },
);

export const deleteToDo = createAsyncThunk(
  "api/task/deleteToDo",
  async (id: number) => {
    await TodoAPI.updateToDo({ id, deleted: true });
    return id;
  },
);

export default todoListSlice.reducer;
