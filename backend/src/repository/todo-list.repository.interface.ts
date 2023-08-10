export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dateCreated?: string;
  lastUpdated?: string;
  dateCompleted?: string;
  project: string;
  deleted?: boolean;
  completionTarget?: string;
}

export interface RepositoryBase {
  toDos: Task[];
}

export interface Repository {
  getToDos: () => Promise<RepositoryBase>;
  addToDo: (payload: AddTaskActionPayload) => Promise<void>;
  updateToDo: (id: number, update: UpdateTaskActionPayload) => Promise<void>;
}

export interface AddTaskActionPayload {
  id: number;
  title: string;
  project?: string;
  dateCreated?: string;
  completionTarget?: string;
}

export interface UpdateTaskActionPayload {
  title?: string;
  completed?: boolean;
  lastUpdated?: string;
  dateCompleted?: string;
  project?: string;
  deleted?: boolean;
  completionTarget?: string;
}
