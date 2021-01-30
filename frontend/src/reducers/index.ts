import { delete_todo, insert_todo, update_todo } from "../utils";
import { State, Actions, Todo } from "../TodoContext";

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

    case "ADD_TODO":
      if (state.todos) {
        const newTodo: Todo = {
          when: (+new Date()).toString(),
          task: action.payload,
          done: false,
          by: "Igor Souza",
        };

        insert_todo(newTodo);
      }

      return { ...state, trigger: true };

    case "CHECK_TODO":
      action.payload.done = !action.payload.done;

      update_todo(action.payload);

      return { ...state, trigger: true };

    case "EDIT_TODO":
      let todo = action.payload.task;

      todo.task = action.payload.newTaskName;
      update_todo(todo);

      return { ...state, trigger: true };

    case "DELETE_TODO":
      delete_todo(action.payload);

      return { ...state, trigger: true };

    default:
      return state;
  }
};
