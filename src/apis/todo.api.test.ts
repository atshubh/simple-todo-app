// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios";
import { TodoAPI } from "./todo.api";

jest.mock("axios");

describe("Todo API", () => {
  test("fetch all tasks", async () => {
    await TodoAPI.fetchAllTasks();
    expect(axios.get).toHaveBeenCalledWith("http://localhost:9091/api/todo");
  });

  test("add new task", async () => {
    await TodoAPI.addToDo({
      id: 1,
      title: "new title",
    });
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:9091/api/todo/add",
      { id: 1, title: "new title" },
    );
  });

  test("update task with new info", async () => {
    await TodoAPI.updateToDo({
      id: 1,
      title: "new title",
    });
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:9091/api/todo/update?id=1",
      { id: 1, title: "new title" },
    );
  });
});
