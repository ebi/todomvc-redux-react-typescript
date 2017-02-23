import { assign } from 'lodash';
import * as iassign from 'immutable-assign';
import { handleActions, Action } from 'redux-actions';

import { Todo, IState } from './model';
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from './actions';

const emptyState: IState = {
  todos: []
};

const initialState: IState = iassign(emptyState, (state) => {
  state.todos = [{
    text: 'Use Redux with TypeScript',
    completed: false,
    id: 0
  }];
  return state;
});

function setTodos(state: IState, setter: (todos: Todo[]) => Todo[]): IState {
  return iassign(state, s => s.todos, setter);
}

export default handleActions<IState, Todo>({
  [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
    const todo: Todo = {
      id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      text: action.payload.text,
      completed: false
    };
    return setTodos(state, (todos) => {
      return [todo, ...todos];
    });
  },
  [DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return iassign(state, s => s.todos, (todos) => {
      return todos.filter(todo =>
        todo.id !== action.payload.id
      );
    });
  },

  [EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
    return setTodos(state, (todos) => {
      return todos.map(todo => {
        return todo.id === action.payload.id
          ? assign(<Todo>{}, todo, { text: action.payload.text })
          : todo
        });
    });
  },

  [COMPLETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return setTodos(state, (todos) => {
      return todos.map(todo => {
        return todo.id === action.payload.id ?
          assign({}, todo, { completed: !todo.completed }) :
          todo
        });
    });
  },

  [COMPLETE_ALL]: (state: IState, action: Action<Todo>): IState => {
    const areAllMarked = state.todos.every(todo => todo.completed);
    return setTodos(state, todos => todos.map(todo => iassign(todo, todo => todo.completed, completed => !areAllMarked )));
  },

  [CLEAR_COMPLETED]: (state: IState, action: Action<Todo>): IState => {
    return setTodos(state, (todos) => {
      return todos.filter(todo => todo.completed === false);
    });
  }
}, initialState);

