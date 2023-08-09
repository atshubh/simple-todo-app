import { DEFAULT_PROJECT } from "../constants";
import {
  type AddTaskActionPayload,
  type Repository,
  type RepositoryBase,
  type UpdateTaskActionPayload,
} from "./todo-list.repository.interface";

const db: RepositoryBase = {
  toDos: [
    {
      id: 1,
      title: "This is a todo example",
      completed: false,
      project: "inbox",
      deleted: false,
      dateCreated: new Date().toISOString(),
    },
  ],
};

const repository: Repository = {
  getToDos: async () => await Promise.resolve(db),
  addToDo: async (payload: AddTaskActionPayload) => {
    db.toDos.push({
      ...payload,
      project: payload.project ?? DEFAULT_PROJECT,
      completed: false,
    });

    await Promise.resolve();
  },
  updateToDo: async (id: number, update: UpdateTaskActionPayload) => {
    const itemToUpdate = db.toDos.find((item) => item.id === id);

    if (itemToUpdate != null) {
      Object.assign(itemToUpdate, { ...update });
      await Promise.resolve();
    }
  },
};

export default repository;
