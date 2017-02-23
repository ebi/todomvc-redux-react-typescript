export type Todo = {
  id?: number;
  text: string;
  completed: boolean;
};

export type IState = {
  todos: Todo[];
}

