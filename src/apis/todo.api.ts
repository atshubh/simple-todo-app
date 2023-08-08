import axios from "axios";
import { API_BASE_URL } from "../constants";

export const TodoAPI = {
  fetchAllTasks: () => axios.get(`${API_BASE_URL}/api/todo`),
};
