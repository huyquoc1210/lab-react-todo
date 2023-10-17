export type Toast = "success" | "error";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  isDelete: boolean;
}

export type Filter = "all" | "completed" | "uncompleted" | "deleted";
