export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dateCreated: Date;
  lastUpdated: Date;
  dateCompleted: Date;
  project: string;
  deleted: boolean;
}
