import repository from "./todo-list.repository";

describe("To-Do List Repository", () => {
  describe("getToDo", () => {
    test("provides all todos", async () => {
      const tasks = await repository.getToDos();

      expect(tasks.toDos?.length).toEqual(1);
      expect(tasks.toDos[0].id).toBe(1);
    });
  });

  describe("addToDo", () => {
    test("adds a to-do to the database", async () => {
      await repository.addToDo({
        id: 3,
        title: "sample title",
      });

      const tasks = await repository.getToDos();
      expect(tasks.toDos?.length).toEqual(2);
      expect(tasks.toDos[1].id).toBe(3);
      expect(tasks.toDos[1].title).toBe("sample title");
    });
  });

  describe("updateToDo", () => {
    test("update a to-do with updated data", async () => {
      await repository.updateToDo(1, {
        title: "updated title",
      });

      const tasks = await repository.getToDos();
      expect(tasks.toDos?.length).toEqual(2);
      expect(tasks.toDos[0].id).toBe(1);
      expect(tasks.toDos[0].title).toBe("updated title");
    });

    test("should skip update if to-do is not found", async () => {
      await repository.updateToDo(5, {
        title: "updated title 2",
      });

      const tasks = await repository.getToDos();
      expect(tasks.toDos?.length).toEqual(2);
      expect(tasks.toDos[0].id).toBe(1);
      expect(tasks.toDos[0].title).toBe("updated title");
    });
  });
});
