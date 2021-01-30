import React, { createContext, useReducer } from "react";

import { reducer, INITIAL_STATE } from "./reducers";
import { fetch_todos } from "./utils";

type ContextProps = {
  state: State;
  dispatch: (actions: Actions) => void;
};

export interface Todo {
  _id?: string;
  task: string;
  when: string;
  done: boolean;
  by: string;
}

export interface State {
  todos?: Array<Todo>;
  trigger?: boolean;
}

export interface Actions {
  type: string;
  payload?: any;
}

export const TodoContext = createContext<Partial<ContextProps>>({});

const TodoContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const asyncDispatch = async (actions: Actions) => {
    switch (actions.type) {
      case "REPOPULATE":
        const newState = await fetch_todos();
        return newState;

      default:
        return dispatch(actions);
    }
  };

  return (
    <TodoContext.Provider value={{ state, dispatch: asyncDispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
