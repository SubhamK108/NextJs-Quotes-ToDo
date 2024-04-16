export interface Data {
  userId: number;
  id: number;
  title: string;
  completed: false;
}

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export interface ToDo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UserToDo {
  todos: ToDo[];
  total: number;
  skip: number;
  limit: 5;
}
