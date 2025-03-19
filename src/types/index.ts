export enum TaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}
