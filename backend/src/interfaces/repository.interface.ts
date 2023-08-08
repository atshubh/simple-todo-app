import { Task } from "./task.interface";

export interface RepositoryBase {
  toDos: Task[];
}

export interface Repository {
  getToDos(): Promise<RepositoryBase>;
}
