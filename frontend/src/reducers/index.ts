import { State, Actions } from "../TodoContext";

export const INITIAL_STATE: State = {
  todos: [],
  trigger: true,
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "POPULATE":
      return {
        ...state,
        todos: action.payload,
        trigger: false,
      };

    case "TRIGGER":
      return { ...state, trigger: action.payload };

    default:
      return state;
  }
};
