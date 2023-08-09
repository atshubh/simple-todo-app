export interface Task {
  id: number;
  title: string;
  completed?: boolean;
  dateCreated?: string;
  lastUpdated?: string;
  dateCompleted?: string;
  project?: string;
  deleted?: boolean;
}
