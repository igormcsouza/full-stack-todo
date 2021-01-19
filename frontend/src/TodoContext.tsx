import React, { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";

type ContextProps = {
  state: State;
  dispatch: (actions: Actions) => void;
};

export interface Todo {
  id: string;
  task: string;
  checked: boolean;
}

export interface State {
  todos?: Array<Todo>;
}

export interface Actions {
  type: string;
  payload: any;
}

const INITIAL_STATE: State = {
  todos: [],
};

const reducer = (state: State, action: Actions): State => {
  let newState: State = {};

  switch (action.type) {
    case "ADD_TODO":
      let newSetTodos: Array<Todo> = [];

      if (state.todos) {
        const newTodo: Todo = {
          id: uuid(),
          task: action.payload,
          checked: false,
        };
        newSetTodos = [...state.todos, newTodo];
      }

      newState = { ...state, todos: newSetTodos };
      return newState;

    case "CHECK_TODO":
      let remnant: Array<Todo> = [];

      if (state.todos) {
        remnant = state.todos.filter((v) => v.id !== action.payload.id);
      }

      action.payload.checked = !action.payload.checked;

      newState = {
        ...state,
        todos: [...remnant, action.payload],
      };

      return newState;

    case "EDIT_TODO":
      let todo = action.payload.task;
      let tasks: Array<Todo> = [];

      if (state.todos) {
        tasks = state.todos.filter((v) => v.id !== todo.id);
      }

      todo.task = action.payload.newTaskName;

      newState = {
        ...state,
        todos: [...tasks, todo],
      };

      return newState;

    case "DELETE_TODO":
      let todos: Array<Todo> = [];

      if (state.todos) {
        todos = state.todos.filter((v) => v.id !== action.payload.id);
      }

      newState = {
        ...state,
        todos: [...todos],
      };

      return newState;

    default:
      return state;
  }
};

export const TodoContext = createContext<Partial<ContextProps>>({});

const TodoContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
