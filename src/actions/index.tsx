import axios from "axios";
import { FETCH_TODOS } from "./types";

export function fetchTodos() {
  return (dispatch: any) => {
    return axios.get("http://localhost:9091/api/todo").then(({ data }) => {
      dispatch(setTodos(data));
    });
  };
}

const setTodos = (data: any) => {
  return {
    type: FETCH_TODOS,
    payload: data,
  };
};
