export interface ToDo {
  id?: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UserToDo {
  todos: ToDo[];
  total: number;
  skip: number;
  limit: number;
}

export const EmptyUserToDo: UserToDo = {
  todos: [],
  total: 0,
  skip: 0,
  limit: 0
};
