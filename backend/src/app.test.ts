import request from "supertest";
import { server } from "./server";

describe.only("To do Express application", () => {
  describe("getToDo", () => {
    test("returns list of all toDos", async () => {
      const response = await request(server()).get("/api/todo");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          toDos: expect.arrayContaining([
            expect.objectContaining({ title: "This is a todo example", id: 1 }),
          ]),
        }),
      );
    });
  });

  describe("addToDo", () => {
    test("add a new to-do to the database", async () => {
      const response = await request(server())
        .post("/api/todo/add")
        .send({ id: 5, title: "new title" });
      expect(response.statusCode).toBe(200);
      const tasks = await request(server()).get("/api/todo");
      expect(tasks.body).toEqual(
        expect.objectContaining({
          toDos: expect.arrayContaining([
            expect.objectContaining({ title: "new title", id: 5 }),
          ]),
        }),
      );
    });
  });

  describe("deleteToDo", () => {
    test("delete a to-do from the database", async () => {
      await request(server())
        .post("/api/todo/add")
        .send({ id: 10, title: "new title 2" });
      const deleteResponse = await request(server()).delete(
        "/api/todo/delete?id=10",
      );
      expect(deleteResponse.statusCode).toBe(200);
      const tasks = await request(server()).get("/api/todo");
      expect(tasks.body.toDos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 10, deleted: true }),
        ]),
      );
    });

    test("do nothing if to-do is not present", async () => {
      await request(server())
        .post("/api/todo/add")
        .send({ id: 10, title: "new title 2" });
      const deleteResponse = await request(server()).delete(
        "/api/todo/delete?id=50",
      );
      expect(deleteResponse.statusCode).toBe(200);
    });
  });

  describe("updateToDo", () => {
    test("update a to-do in the database", async () => {
      await request(server())
        .post("/api/todo/add")
        .send({ id: 100, title: "new title 2" });

      const updateResponse = await request(server())
        .put("/api/todo/update?id=100")
        .send({ title: "new title 3" });
      expect(updateResponse.statusCode).toBe(200);
      const tasks = await request(server()).get("/api/todo");
      expect(tasks.body.toDos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 100, title: "new title 3" }),
        ]),
      );
    });

    test("do nothing if to-do is not present in the database", async () => {
      await request(server())
        .post("/api/todo/add")
        .send({ id: 300, title: "new title 2" });

      const updateResponse = await request(server())
        .put("/api/todo/update?id=200")
        .send({ title: "new title 3" });
      expect(updateResponse.statusCode).toBe(200);
      const tasks = await request(server()).get("/api/todo");
      expect(tasks.body.toDos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 300, title: "new title 2" }),
        ]),
      );
    });

    test("do nothing if id is not valid", async () => {
      const updateResponse = await request(server())
        .put("/api/todo/update")
        .send({ title: "new title 3" });
      expect(updateResponse.statusCode).toBe(200);
    });
  });
});
