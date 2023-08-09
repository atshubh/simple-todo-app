import request from "supertest";
import { server } from "./server";

describe("To do Express application", () => {
  describe("getToDo ", () => {
    test("returns list of all toDos", async () => {
      const response = await request(server()).get("/api/todo");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({}));
    });
  });
});
