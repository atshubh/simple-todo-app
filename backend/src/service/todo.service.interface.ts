import {
  type RepositoryBase,
  type AddTaskActionPayload,
  type UpdateTaskActionPayload,
} from "../repository/todo-list.repository.interface";

export interface ToDoService {
  getToDos: () => Promise<RepositoryBase>;
  addToDo: (payload: AddTaskActionPayload) => Promise<void>;
  updateToDo: (id: number, update: UpdateTaskActionPayload) => Promise<void>;
  deleteToDo: (id: number, currentDate?: string) => Promise<void>;
}
