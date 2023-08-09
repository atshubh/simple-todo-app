export interface AddTaskActionPayload {
  id: number;
  title: string;
  project?: string;
  dateCreated?: string;
  completionTarget?: string;
}

export interface UpdateTaskActionPayload {
  id: number;
  title?: string;
  completed?: boolean;
  lastUpdated?: string;
  dateCompleted?: string;
  project?: string;
  deleted?: boolean;
  completionTarget?: string;
}
