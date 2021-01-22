import React, { createContext, useReducer } from "react";

import { reducer, INITIAL_STATE } from "./reducers";

type ContextProps = {
  state: State;
  dispatch: (actions: Actions) => void;
};

export interface Todo {
  id?: string;
  task: string;
  when: string;
  checked: boolean;
  by: string;
}

export interface State {
  todos?: Array<Todo>;
}

export interface Actions {
  type: string;
  payload?: any;
}

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
