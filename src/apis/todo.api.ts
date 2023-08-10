import axios from "axios";
import { API_BASE_URL } from "../constants";
import {
  type UpdateTaskActionPayload,
  type AddTaskActionPayload,
} from "../features/todo-list/task-actions.interface";

export const TodoAPI = {
  fetchAllTasks: async () => await axios.get(`${API_BASE_URL}/api/todo`),
  addToDo: async (payload: AddTaskActionPayload) =>
    await axios.post(`${API_BASE_URL}/api/todo/add`, payload),
  updateToDo: async (payload: UpdateTaskActionPayload) =>
    await axios.put(
      `${API_BASE_URL}/api/todo/update?id=${payload.id}`,
      payload,
    ),
};
