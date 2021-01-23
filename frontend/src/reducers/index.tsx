import { delete_todo, insert_todo, update_todo } from "../utils";
import { State, Actions, Todo } from "../TodoContext";

export const INITIAL_STATE: State = {
  todos: [],
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "REPOPULATE":
      const newState = { ...state, todos: action.payload };

      return newState;

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

      return state;

    case "CHECK_TODO":
      action.payload.done = !action.payload.done;

      update_todo(action.payload);

      return state;

    case "EDIT_TODO":
      let todo = action.payload.task;

      todo.task = action.payload.newTaskName;
      update_todo(todo);

      return state;

    case "DELETE_TODO":
      delete_todo(action.payload);

      return state;

    default:
      return state;
  }
};
