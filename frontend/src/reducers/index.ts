import { State, Actions } from "../TodoContext";

export const INITIAL_STATE: State = {
  todos: [],
  trigger: true,
};

export const reducer = (state: State, action: Actions): State => {
  console.log("Was called");
  switch (action.type) {
    case "POPULATE":
      console.log("We Are HERE");
      console.log(action.payload);
      return {
        ...state,
        todos: action.payload,
        trigger: false,
      };

    case "TRIGGER":
      console.log("We Are HERE ON TRIGGER");
      console.log(action.payload);
      return { ...state, trigger: action.payload };

    default:
      return state;
  }
};
