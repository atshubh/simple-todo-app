import {
  type AddTaskActionPayload,
  type Repository,
  type RepositoryBase,
  type UpdateTaskActionPayload,
} from "../repository/todo-list.repository.interface";
import todoService from "./todo.service";
import { type ToDoService } from "./todo.service.interface";

describe("TodoService", () => {
  let sampleDB: RepositoryBase;
  let sampleRepository: Repository;
  let serviceToTest: ToDoService;

  beforeEach(() => {
    sampleDB = {
      toDos: [
        {
          title: "Sample title",
          id: 1,
          completed: false,
          project: "inbox",
          dateCreated: new Date().toISOString(),
        },
      ],
    };

    sampleRepository = {
      getToDos: jest.fn().mockResolvedValue(sampleDB),
      addToDo: jest.fn(),
      updateToDo: jest.fn(),
    };

    serviceToTest = todoService(sampleRepository);
  });

  test("gets all todos", async () => {
    const response = await serviceToTest.getToDos();
    expect(sampleRepository.getToDos).toBeCalled();
    expect(response).toEqual(sampleDB);
  });

  describe("addToDo", () => {
    test("adds new todo", async () => {
      const addActionPayload: AddTaskActionPayload = {
        id: 1,
        title: "new title",
        project: "inbox",
        dateCreated: new Date().toISOString(),
      };

      await serviceToTest.addToDo(addActionPayload);

      expect(sampleRepository.addToDo).toHaveBeenCalledWith({
        ...addActionPayload,
      });
    });

    test("adds new todo with default project if not specified", async () => {
      const addActionPayload: AddTaskActionPayload = {
        id: 1,
        title: "new title",
        dateCreated: new Date().toISOString(),
      };

      await serviceToTest.addToDo(addActionPayload);

      expect(sampleRepository.addToDo).toHaveBeenCalledWith(
        expect.objectContaining({
          project: "inbox",
        }),
      );
    });
  });

  describe("deleteToDo", () => {
    test("deletes to-do with specified id", async () => {
      const deletionDate = new Date();
      await serviceToTest.deleteToDo(1, deletionDate);

      expect(sampleRepository.updateToDo).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ deleted: true, lastUpdated: deletionDate }),
      );
    });

    test("deletes to-do with specified id and pick the deletion date when missing", async () => {
      await serviceToTest.deleteToDo(1);

      expect(sampleRepository.updateToDo).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          deleted: true,
          lastUpdated: expect.any(String),
        }),
      );
    });
  });

  describe("updateToDo", () => {
    test("updates to-do with new task properties", async () => {
      const dateCompleted = new Date().toISOString();
      const updateActionPayload: UpdateTaskActionPayload = {
        completed: true,
        title: "updatedTitle",
        dateCompleted,
        lastUpdated: dateCompleted,
      };

      await serviceToTest.updateToDo(1, updateActionPayload);

      expect(sampleRepository.updateToDo).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          title: "updatedTitle",
          completed: true,
          dateCompleted,
          lastUpdated: dateCompleted,
        }),
      );
    });

    test("updates to-do with new task properties and picks update date if missing", async () => {
      const updateActionPayload: UpdateTaskActionPayload = {
        title: "updatedTitle",
      };

      await serviceToTest.updateToDo(1, updateActionPayload);

      expect(sampleRepository.updateToDo).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          title: "updatedTitle",
          dateCompleted: undefined,
          lastUpdated: expect.any(String),
        }),
      );
    });
  });
});
