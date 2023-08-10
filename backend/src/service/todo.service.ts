import { DEFAULT_PROJECT } from "../constants";
import {
  type AddTaskActionPayload,
  type UpdateTaskActionPayload,
  type Repository,
} from "../repository/todo-list.repository.interface";
import { type ToDoService } from "./todo.service.interface";

const todoService = (repository: Repository): ToDoService => {
  return {
    getToDos: async () => {
      return await repository.getToDos();
    },

    addToDo: async (payload: AddTaskActionPayload) => {
      if (!payload.project) {
        payload.project = DEFAULT_PROJECT;
      }
      await repository.addToDo(payload);
    },

    deleteToDo: async (id: number, currentDate?: string) => {
      await repository.updateToDo(id, {
        deleted: true,
        lastUpdated: currentDate ?? new Date().toISOString(),
      });
    },

    updateToDo: async (id: number, update: UpdateTaskActionPayload) => {
      const dateCompleted = update.completed
        ? update.dateCompleted ?? new Date().toISOString()
        : undefined;
      await repository.updateToDo(id, {
        ...update,
        lastUpdated: update.lastUpdated ?? new Date().toISOString(),
        dateCompleted,
      });
    },
  };
};

export default todoService;
